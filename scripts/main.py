# -*- coding: utf-8 -*-

from pymongo import MongoClient
import aiohttp
import asyncio
from scraper import ScraperConfig
from async_iterators import AdvertIterator
from argparser import args


async def main():
    key = '{0.transaction}-{0.property_type}-{0.city}'.format(args)

    client = MongoClient('localhost', 27017)
    db = client.advert_db
    collection = db[key]

    def get_advert_func(advert_id):
        return collection.find_one({'advert_id': advert_id})

    async with aiohttp.ClientSession() as session:
        scraper_config = ScraperConfig(
            session,
            args.transaction,
            args.property_type,
            args.city,
            distance=args.distance
        )

        found = 0
        updated = 0
        created = 0

        advert_iterator = AdvertIterator(
            scraper_config,
            days_treshold=args.days_limit,
            page_from=args.page_from,
            page_to=args.page_to,
            get_advert_func=get_advert_func,
            skip_if_advert_exists=args.all
        )
        async for advert, advert_number in advert_iterator:

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

            print('[{}] {}: {}'.format(key, advert_number, advert.link))

        print(f'Found: {found}\nUpdated: {updated}\nCreated: {created}')


if __name__ == '__main__':
    loop = asyncio.get_event_loop()
    loop.run_until_complete(main())
