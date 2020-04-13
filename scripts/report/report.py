from pymongo import MongoClient
from datetime import date

from iterators import WeekIterator
from data_generator import ReportGenerator
from data import DataSaver

client = MongoClient('localhost', 27017)
db = client.advert_db


def report(collection_name, price_field='price', file_name=None, extra_query=None):
    collection = db[collection_name]
    data_saver = DataSaver(file_name or collection_name)

    for date_from, date_to in WeekIterator(start_date=date(2020, 3, 2)):
        report_generator = ReportGenerator(
            collection, price_field, extra_query=extra_query)

        row = {'name': str(date_from.date())}
        for rooms in [1, 2, 3, 4]:
            avg_price, ads_count = report_generator.run(
                date_from, date_to, rooms=rooms)
            row['rooms_{}'.format(rooms)] = {
                'avg_price': avg_price,
                'ads_count': ads_count
            }
        data_saver.save(row)

    print(file_name or collection_name, 'done')
