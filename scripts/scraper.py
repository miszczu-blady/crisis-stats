# -*- coding: utf-8 -*-

import requests
from lxml import html
from urllib.parse import urlencode

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
    }
}


class ScraperConfig:

    def __init__(self, transaction, property_type, city, distance=None):
        self.transaction = transaction
        self.property_type = property_type
        self.city = city
        self.distance = distance


class Scraper:

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

    def get_page(self, page_number):
        return requests.get(
            self.url + '?' + self.get_params(page_number)
        )

    def get_links_from_page(self, page):
        tree = html.fromstring(page.content)
        links = tree.xpath(
            "//article[contains(@data-featured-name, 'listing_no_promo')]"
        )
        result = []
        for link in links:
            result.append([
                link.attrib['data-url'],
                int(link.attrib['data-tracking-id'])
            ])
        return result

    def get_pages_count(self, page):
        tree = html.fromstring(page.content)
        elements = tree.xpath(
            "//ul[contains(@class, 'pager')]/li[last() - 1]/a"
        )
        pages_count = len(elements) > 0 and elements[0].text or 0
        print('>>>> pages_count', pages_count)
        return int(pages_count)
