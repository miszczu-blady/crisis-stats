# -*- coding: utf-8 -*-

from tqdm import tqdm
import requests
from lxml import html


class Scraper(object):

    def __init__(self, transaction, property_type, city, page_from, page_to):
        self.transaction = transaction
        self.property_type = property_type
        self.city = city

        links = []
        for i in tqdm(range(page_from, page_to)):
            page = self.get_page(i)
            links += self.get_links(page)
        self.links = set(links)

    def get_page(self, number):
        return requests.get('https://www.otodom.pl/{transaction}/{property_type}/{city}/?page={number}'.format(
            number=number,
            transaction=self.transaction,
            property_type=self.property_type,
            city=self.city
        ))

    def get_links(self, page):
        tree = html.fromstring(page.content)
        links = tree.xpath(
            "//header[contains(@class, 'offer-item-header')]/*/a[starts-with(@href, 'https://www.otodom.pl/oferta/')]"
        )
        return list(map(lambda x: x.attrib['href'], links))
