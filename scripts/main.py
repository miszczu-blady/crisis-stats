# -*- coding: utf-8 -*-

from pymongo import MongoClient

from scraper import ScraperConfig
from iterators import AdvertIterator
from argparser import args

client = MongoClient('localhost', 27017)
db = client.advert_db
key = '{0.transaction}-{0.property_type}-{0.city}'.format(args)
collection = db[key]

scraper_config = ScraperConfig(
    args.transaction,
    args.property_type,
    args.city,
    distance=args.distance
)

found = 0
updated = 0
created = 0


def get_advert_func(advert_id):
    return collection.find_one({'advert_id': advert_id})


advert_iterator = AdvertIterator(
    scraper_config,
    days_treshold=args.days_limit,
    page_from=args.page_from,
    page_to=args.page_to,
    get_advert_func=get_advert_func,
    skip_if_advert_exists=args.all,
)
for advert_number, advert in enumerate(advert_iterator, 1):
    result = collection.update_one(
        {'advert_id': advert.advert_id},
        {'$set': advert.to_dict()},
        True
    )
    if result.matched_count > 0:
        found += 1
    if result.upserted_id:
        created += 1
    else:
        updated += 1

    print('[{}] {}: {}, {}'.format(
        key, advert_number, advert.link, advert.modified_date))

print("Found: {}\nUpdated: {}\nCreated: {}".format(found, updated, created))
