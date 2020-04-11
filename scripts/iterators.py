import requests
from datetime import date

from scraper import Scraper
from advert import Advert


class PageIterator:

    total_pages = None

    def __init__(self, config, page_from=None, page_to=None):
        self.scraper = Scraper(config)
        self.page_number = page_from or 1
        self.page_to = page_to

    def __iter__(self):
        return self

    def __next__(self):
        page = self.scraper.get_page(self.page_number)

        if self.total_pages is None:
            self.total_pages = self.scraper.get_pages_count(page)

        links = self.scraper.get_links_from_page(page)
        if self.page_number > self.total_pages:
            raise StopIteration()

        if self.page_to and self.page_number > self.page_to:
            raise StopIteration()

        self.page_number += 1
        return links


class AdvertIterator:

    links = None

    def __init__(self, config, days_treshold=None, skip_if_advert_exists=False,
        get_advert_func=None, page_from=None, page_to=None):

        self.config = config
        self.page_iterator = PageIterator(
            config,
            page_from=page_from,
            page_to=page_to
        )

        self.days_treshold = days_treshold
        self.ads_over_treshold = 2 * 24  # 2 pages
        self.ads_over_treshold_counter = 0

        self.skip_if_advert_exists = skip_if_advert_exists
        self.get_advert_func = get_advert_func

    def __iter__(self):
        return self

    def get_next_link(self):
        next_link = None

        while(not next_link):
            if not self.links:
                self.links = next(self.page_iterator)

            if len(self.links) == 0:
                raise StopIteration()

            next_link, advert_id = self.links.pop(0)

            if self.skip_if_advert_exists and self.get_advert_func and self.get_advert_func(advert_id):
                next_link = None

        return next_link

    def __next__(self):
        link = self.get_next_link()
        page = requests.get(link)
        advert = Advert(self.config, link, page.content)

        if self.days_treshold:
            days = (date.today() - advert.modified_date.date()).days
            if (days >= self.days_treshold):
                self.ads_over_treshold_counter += 1
                if self.ads_over_treshold_counter > self.ads_over_treshold:
                    raise StopIteration()

        return advert
