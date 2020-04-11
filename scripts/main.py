# -*- coding: utf-8 -*-

import requests
from pymongo import MongoClient
import argparse
from datetime import datetime, date

from scraper import ScraperConfig
from iterators import AdvertIterator

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
parser.add_argument("--page-from", type=int, help="page from")
parser.add_argument("--page-to", type=int, help="page to")
parser.add_argument("--days-limit", type=int, help="days limit")
args = parser.parse_args()

key = f'{args.transaction}-{args.property_type}-{args.city}'
collection = db[key]

scraper_config = ScraperConfig(
    args.transaction,
    args.property_type,
    args.city
)

found = 0
updated = 0
created = 0

def get_advert(advert_id):
    return collection.find_one({'advert_id': advert_id})

advert_iterator = AdvertIterator(
    scraper_config,
    days_treshold=args.days_limit,
    page_from=args.page_from,
    page_to=args.page_to
)
for advert_number, advert in enumerate(advert_iterator, 1):
    print(f'[{key}] {advert_number}: {advert.link}')

    result = collection.update_one(
        {'advert_id': advert.advert_id},
        {'$set': advert.to_dict()},
        True
    )
    if result.matched_count > 0:
        found += 1
    if result.modified_count > 0:
        updated += 1
    if result.upserted_id:
        created += 1

print(f"Found: {found}\nUpdated: {updated}\nCreated: {created}")
