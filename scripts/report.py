# -*- coding: utf-8 -*-
from pymongo import MongoClient
from datetime import timedelta, date, datetime, time
from pprint import pprint
import json
from math import ceil


client = MongoClient('localhost', 27017)
db = client.advert_db

def report(collection_name, price_field, file_name=None, extra_query=None):
    collection = db[collection_name]
    report_price = []
    report_count = []

    weeks_to_count = ceil((date.today() - date(2020, 3, 2)).days / 7)
    for week in range(weeks_to_count, -1, -1):
        date_start = date.today() - timedelta(days=week * 7 + date.today().weekday())
        date_end = date_start + timedelta(days=6)

        query = {'modified_date': {
            '$gte': str(datetime.combine(date_start, time(0, 0, 0))),
            '$lte': str(datetime.combine(date_end, time(23, 59, 59))),
        }}

        if extra_query:
            query = {**query, **extra_query}

        item_price = {'name': date_start.strftime('%m-%d')}
        item_count = {'name': date_start.strftime('%m-%d')}

        for rooms_num in [1, 2, 3, 4]:
            ads = collection.find({
                **query,
                'rooms_num': rooms_num == 4 and {'$gte': 4} or rooms_num
            })
            prices = list(map(lambda x: x[price_field], ads))
            prices = list(filter(lambda x: x is not None, prices))

            if len(prices) > 0:
                avg_price = sum(prices) / len(prices)
            else:
                avg_price = 0

            item_price['rooms_{}'.format(rooms_num)] = int(avg_price)
            item_count['rooms_{}'.format(rooms_num)] = ads.count()

        report_price.append(item_price)
        report_count.append(item_count)

    file_path = '../src/data/estates/{}-ceny.json'.format(file_name or collection_name)
    with open(file_path, 'w') as fp:
        json.dump(report_price, fp)

    file_path = '../src/data/estates/{}-liczba.json'.format(file_name or collection_name)
    with open(file_path, 'w') as fp:
        json.dump(report_count, fp)


report(
    'wynajem-mieszkanie-wroclaw',
    'price',
)
report(
    'sprzedaz-mieszkanie-wroclaw',
    'price_m2',
    file_name='sprzedaz-mieszkanie-pierwotny-wroclaw',
    extra_query={'market': 'primary'}
)

report(
    'sprzedaz-mieszkanie-wroclaw',
    'price_m2',
    file_name='sprzedaz-mieszkanie-wtorny-wroclaw',
    extra_query={'market': 'secondary'}
)


report(
    'wynajem-mieszkanie-warszawa',
    'price',
)
report(
    'sprzedaz-mieszkanie-warszawa',
    'price_m2',
    file_name='sprzedaz-mieszkanie-pierwotny-warszawa',
    extra_query={'market': 'primary'}
)

report(
    'sprzedaz-mieszkanie-warszawa',
    'price_m2',
    file_name='sprzedaz-mieszkanie-wtorny-warszawa',
    extra_query={'market': 'secondary'}
)


report(
    'wynajem-mieszkanie-krakow',
    'price',
)
report(
    'sprzedaz-mieszkanie-krakow',
    'price_m2',
    file_name='sprzedaz-mieszkanie-pierwotny-krakow',
    extra_query={'market': 'primary'}
)

report(
    'sprzedaz-mieszkanie-krakow',
    'price_m2',
    file_name='sprzedaz-mieszkanie-wtorny-krakow',
    extra_query={'market': 'secondary'}
)


report(
    'wynajem-mieszkanie-gdansk',
    'price',
)
report(
    'sprzedaz-mieszkanie-gdansk',
    'price_m2',
    file_name='sprzedaz-mieszkanie-pierwotny-gdansk',
    extra_query={'market': 'primary'}
)

report(
    'sprzedaz-mieszkanie-gdansk',
    'price_m2',
    file_name='sprzedaz-mieszkanie-wtorny-gdansk',
    extra_query={'market': 'secondary'}
)
