# -*- coding: utf-8 -*-

import requests
from lxml import html


class ScraperConfig:

    def __init__(self, transaction, property_type, city):
        self.transaction = transaction
        self.property_type = property_type
        self.city = city


class Scraper:

    def __init__(self, config):
        self.config = config

    def get_page(self, page_number):
        return requests.get('https://www.otodom.pl/{transaction}/{property_type}/{city}/?page={page_number}'.format(
            page_number=page_number,
            transaction=self.config.transaction,
            property_type=self.config.property_type,
            city=self.config.city
        ))

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
        return int(pages_count)
