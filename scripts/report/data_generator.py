# from statistics import mean


# class ReportGenerator:

#     def __init__(self, collection, price_field, extra_query=None):
#         self.collection = collection
#         self.price_field = price_field
#         self.extra_query = extra_query

#     def run(self, date_from, date_to, rooms=None):
#         query = {
#             'modified_date': {
#                 '$gte': str(date_from),
#                 '$lt': str(date_to)
#             }
#         }
#         if rooms:
#             query['rooms_num'] = rooms == 4 and {'$gte': 4} or rooms
#         if self.price_field:
#             query[self.price_field] = {'$ne': None}
#         if self.extra_query:
#             query.update(self.extra_query)
#         print(query)
#         data = self.collection.find(query)
#         prices = list(map(lambda x: x[self.price_field], data))
#         avg_price = len(prices) > 0 and int(mean(prices)) or 0
#         return avg_price, len(prices)


from statistics import mean


class ReportGenerator:

    def __init__(self, collection, price_field, extra_query=None):
        self.collection = collection
        self.price_field = price_field
        self.extra_query = extra_query

    def run(self, date_from, date_to, extra_query=None):
        query = {
            'modified_date': {
                '$gte': str(date_from),
                '$lt': str(date_to)
            }
        }
        if extra_query:
            query.update(extra_query)
        if self.price_field:
            query[self.price_field] = {'$ne': None}
        if self.extra_query:
            query.update(self.extra_query)
        print(query)
        data = self.collection.find(query)
        prices = list(map(lambda x: x[self.price_field], data))
        avg_price = len(prices) > 0 and int(mean(prices)) or 0
        return avg_price, len(prices)
