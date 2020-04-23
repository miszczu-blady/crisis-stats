# -*- coding: utf-8 -*-

from lxml import html
from urllib.parse import urlencode
from utils import get_page_contents


REGION_QUERY = {
    'gdansk': {
        'search[region_id]': ['11'],
        'search[subregion_id]': ['439'],
        'search[city_id]': ['40']
    },
    'krakow': {
        'search[region_id]': ['6'],
        'search[subregion_id]': ['410'],
        'search[city_id]': ['38']
    },
    'warszawa': {
        'search[region_id]': ['7'],
        'search[subregion_id]': ['197'],
        'search[city_id]': ['26']
    },
    'wroclaw': {
        'search[region_id]': ['1'],
        'search[subregion_id]': ['381'],
        'search[city_id]': ['39']
    },
    'poznan': {
        'search[region_id]': ['15'],
        'search[subregion_id]': ['462'],
        'search[city_id]': ['1']
    }
}


class ScraperConfig:

    def __init__(self, session, transaction, property_type, city,
                 distance=None):
        self.session = session
        self.transaction = transaction
        self.property_type = property_type
        self.city = city
        self.distance = distance


class AsyncScraper:

    def __init__(self, config):
        self.config = config
        self.url = 'https://www.otodom.pl/{0.transaction}/{0.property_type}/{0.city}/'.format(
            config)

    def get_params(self, page_number):
        params = {'page': page_number}
        region_query = REGION_QUERY.get(self.config.city)
        if self.config.distance and region_query:
            params.update(region_query)
            params.update({'search[dist]': [self.config.distance]})
        return urlencode(params, doseq=True)

    async def get_pages(self, page_from, page_to):
        urls = [self.url + '?' + self.get_params(page_number)
                for page_number in range(page_from, page_to + 1)]

        return await get_page_contents(self.config.session, urls)

    def get_links_from_pages(self, pages):
        result = []
        for page in pages:
            tree = html.fromstring(page)
            links = tree.xpath(
                "//article[contains(@data-featured-name, 'listing_no_promo')]"
            )

            for link in links:
                result.append([
                    link.attrib['data-url'],
                    int(link.attrib['data-tracking-id'])
                ])
        return result

    async def get_pages_count(self, page):
        tree = html.fromstring(page)
        elements = tree.xpath(
            "//ul[contains(@class, 'pager')]/li[last() - 1]/a"
        )
        pages_count = len(elements) > 0 and elements[0].text or 0
        return int(pages_count)
