import json
from lxml import html

class Advert:

    def __init__(self, transaction, property_type, city, link, content):
        self.city = city
        self.property_type = property_type
        self.transaction = transaction

        self.link = link
        self.content = content
        self.tree = html.fromstring(self.content)
        self.advert = self.get_advert()
        self.created_date = self.advert.get('dateCreated')
        self.modified_date = self.advert.get('dateModified')
        self.price = self.get_price()
        self.price_m2 = self.get_price_m2()
        self.title = self.advert.get('title')
        self.advert_id = self.advert.get('advertId')
        self.attributes = self.get_characteristics()
        self.advert_owner = self.get_advert_owner()
        self.market = self.attributes.get('market', '-')
        self.district = self.get_district()

    def to_dict(self):
        return {
            "advert_id": self.advert_id,
            "city": self.city,
            "property_type": self.property_type,
            "transaction": self.transaction,
            "district": self.district,
            "link": self.link,
            "title": self.title,
            "size": self.get_size(),
            "price": self.price,
            "price_m2": self.price_m2,
            "rooms_num": self.get_rooms_num(),
            "advert_owner": self.advert_owner,
            "market": self.market,
            "created_date": self.advert.get('dateCreated'),
            "modified_date": self.advert.get('dateModified'),
        }

    def print(self):
        print('[{0.advert_id}] Link: {0.link}'.format(self))
        print('- Title:', self.title)
        print('- Size: {} m2'.format(get_size))
        print('- Price {}, per m2: {}'.format(self.price, self.price_m2))
        print('- Created at:', self.created_date, self.modified_date)
        print('- Rooms:', self.get_rooms_num())
        print('- Market:', self.market)
        print('- Advert owner:', self.advert_owner)
        print('- District:', self.district)

    def get_advert(self):
        script_elem = self.tree.xpath('//script[@id="server-app-state"]')
        return json.loads(script_elem[0].text)['initialProps']['data']['advert']

    def get_characteristics(self):
        attributes = {}
        for item in self.advert.get('characteristics', []):
            attributes[item['key']] = item['value']
        return attributes

    def get_rooms_num(self):
        rooms_num = self.attributes.get('rooms_num', None)
        if rooms_num and rooms_num.isdigit():
            return int(rooms_num)

    def get_size(self):
        size = self.attributes.get('m')
        if size:
            return int(float(size))

    def get_price(self):
        price_str = self.advert.get('price', {}).get('value', '')
        if price_str:
            return round(float(price_str))

    def get_price_m2(self):
        price_m2_str = self.advert.get('areaPrice', {}).get('value', '')
        if price_m2_str:
            return round(float(price_m2_str))

    def get_address(self):
        return self.advert.get('location', {}).get('address')

    def get_coordinates(self):
        return self.advert.get('location', {}).get('coordinates')

    def get_district(self):
        levels = self.advert.get('location', {}).get('geoLevel', [])
        filtered = list(filter(lambda x: x["type"] == "district", levels))
        return len(filtered) > 0 and filtered[0]['label'] or ''

    def get_advert_owner(self):
        return self.advert.get("advertOwner", {}).get('type')
