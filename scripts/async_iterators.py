from datetime import date
from scraper import AsyncScraper
from advert import Advert
from utils import get_page_contents


class PageIterator:

    total_pages = None
    step_size = 10

    def __init__(self, config, page_from=None, page_to=None):
        self.scraper = AsyncScraper(config)
        self.page_number = page_from or 1
        self.page_to = page_to

    def __aiter__(self):
        return self

    async def __anext__(self):

        if self.page_to and self.page_number > self.page_to:
            raise StopAsyncIteration

        page_from = self.page_number
        page_to = self.page_number + self.step_size
        if self.page_to and page_to > self.page_to:
            page_to = self.page_to

        pages = await self.scraper.get_pages(page_from, page_to)

        if self.total_pages is None:
            self.total_pages = await self.scraper.get_pages_count(pages[0])

        if self.page_number > self.total_pages:
            raise StopAsyncIteration

        links = self.scraper.get_links_from_pages(pages)
        self.page_number += self.step_size

        return links


class AdvertIterator:

    links = None
    step_size = 24
    ads = None
    index = 0
    ads_over_treshold_counter = 0
    ads_over_treshold = 2 * 24  # 2 pages

    def __init__(self, config, days_treshold=None, skip_if_advert_exists=False,
                 get_advert_func=None, page_from=None, page_to=None):

        self.config = config
        self.page_iterator = PageIterator(
            config,
            page_from=page_from,
            page_to=page_to
        )

        self.days_treshold = days_treshold
        self.skip_if_advert_exists = skip_if_advert_exists
        self.get_advert_func = get_advert_func

    def __aiter__(self):
        return self

    def remove_existing_ads(self, links):
        result = []
        for link, advert_id in links:
            if not self.get_advert_func(advert_id):
                result.append((link, advert_id))
        return result

    async def get_next_link_group(self):
        links = None
        while(not links):
            if not self.links:
                self.links = await self.page_iterator.__anext__()

            if len(self.links) == 0:
                raise StopAsyncIteration

            links, self.links = self.links[
                :self.step_size], self.links[self.step_size:]

            if self.skip_if_advert_exists and self.get_advert_func:
                links = self.remove_existing_ads(links)

        return links

    async def get_ads(self):
        links_with_ids = await self.get_next_link_group()
        links, advert_ids = list(zip(*links_with_ids))
        pages = await get_page_contents(self.config.session, links)

        ads = []
        for page, link in zip(pages, links):
            advert = Advert(self.config, link, page)
            ads.append(advert)
        return ads

    def days_treshold_exceeded(self, advert):
        if self.days_treshold:
            days = (date.today() - advert.modified_date.date()).days
            if (days >= self.days_treshold):
                self.ads_over_treshold_counter += 1
                if self.ads_over_treshold_counter > self.ads_over_treshold:
                    raise StopAsyncIteration

    async def __anext__(self):
        if not self.ads:
            self.ads = await self.get_ads()

        advert = self.ads.pop(0)

        if self.days_treshold_exceeded(advert):
            raise StopAsyncIteration

        self.index += 1
        return advert, self.index
