from pymongo import MongoClient
from iterators import WeekIterator
from data_generator import ReportGenerator
from data import DataSaver

client = MongoClient('localhost', 27017)
db = client.advert_db


def report(collection_name,
           price_field='price',
           file_name=None,
           extra_query=None,
           weeks=1,
           start_date=None,
           groups=None):

    if start_date:
        iterator_kwags = {'start_date': start_date}
    else:
        iterator_kwags = {'weeks': weeks}

    print(iterator_kwags)

    collection = db[collection_name]
    data_saver = DataSaver(file_name or collection_name)

    for date_from, date_to in WeekIterator(**iterator_kwags):
        report_generator = ReportGenerator(
            collection, price_field, extra_query=extra_query)

        row = {'name': str(date_from.date())}

        for group in groups:
            avg_price, ads_count = report_generator.run(
                date_from, date_to, extra_query=group['query'])
            row[group['label']] = {
                'avg_price': avg_price,
                'ads_count': ads_count
            }
        data_saver.save(row)

    print(file_name or collection_name, 'done')
