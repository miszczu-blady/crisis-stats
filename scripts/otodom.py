# -*- coding: utf-8 -*-

import requests
from tqdm import tqdm
from pymongo import MongoClient
import argparse

from scraper import Scraper
from advert import Advert


client = MongoClient('localhost', 27017)
db = client.advert_db

transactions = [
    'wynajem',
    'sprzedaz'
]
property_types = [
    'mieszkanie',
    'dom',
]
cities = [
    'wroclaw',
    'warszawa',
    'krakow',
    'gdansk'
]

parser = argparse.ArgumentParser(description='otodom.pl scrapper')

parser.add_argument(
    "--transaction",
    required=True,
    type=str,
    help="transaction",
    choices=transactions,
)
parser.add_argument(
    "--property-type",
    required=True,
    type=str,
    help="property type",
    choices=property_types
)
parser.add_argument(
    "--city",
    required=True,
    type=str,
    help="miasto",
    choices=cities
)
parser.add_argument("--page-from", default=1, type=int, help="page from")
parser.add_argument("--page-to", default=1, type=int, help="page to")
parser.add_argument("--force", default=False, help="force", action="store_true")
args = parser.parse_args()

key = args.transaction + '-' + args.property_type + '-' + args.city
collection = db[key]

scraper = Scraper(
    args.transaction,
    args.property_type,
    args.city,
    args.page_from,
    args.page_to + 1
)
desc = '{}-{} {}'.format(args.page_from, args.page_to, key)


found = 0
updated = 0
created = 0
not_created = 0
for link in tqdm(list(scraper.links), desc=desc):
    page = requests.get(link)
    try:
        advert = Advert(
            args.transaction,
            args.property_type,
            args.city,
            link,
            page.content
        )
        advert_dict = advert.to_dict()
        result = collection.update_one(
            {'advert_id': advert.advert_id},
            {'$set': advert_dict},
            True
        )
        if result.matched_count > 0:
            found += 1
        if result.modified_count > 0:
            updated += 1

        if result.upserted_id:
            created += 1
            not_created = 0
        else:
            not_created += 1

    except Exception as e:
        print('Link:', link)
        print(e)

    if not args.force and not_created >= 60:
        break
print('Found: {}, updated: {}, created: {}'.format(found, updated, created))
