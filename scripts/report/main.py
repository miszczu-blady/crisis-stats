# -*- coding: utf-8 -*-

from report import report
# from datetime import date


groups = [
    {'label': 'rooms_1', 'query': {'rooms_num': 1}},
    {'label': 'rooms_2', 'query': {'rooms_num': 2}},
    {'label': 'rooms_3', 'query': {'rooms_num': 3}},
    {'label': 'rooms_4', 'query': {'rooms_num': {'$gte': 4}}}
]

plot_groups = [
    {'label': '400-1000', 'query': {'size': {'$gt': 400, '$lte': 1000}}},
    {'label': '1000-1600', 'query': {'size': {'$gt': 1000, '$lte': 1600}}},
    {'label': '1600-4000', 'query': {'size': {'$gt': 1600, '$lte': 4000}}},
    {'label': '4000', 'query': {'size': {'$gt': 4000}}}
]

primary_params = {
    'price_field': 'price_m2',
    'extra_query': {'market': 'primary'},
    'groups': groups,
}
secondary_params = {
    'price_field': 'price_m2',
    'extra_query': {'market': 'secondary'},
    'groups': groups,
}
plot_params = {
    'price_field': 'price_m2',
    'extra_query': {'characteristics.type': 'building'},
    # 'start_date': date(2020, 3, 30),
    'groups': plot_groups
}

# wynajem mieszkanie
report('wynajem-mieszkanie-wroclaw', groups=groups)
report('wynajem-mieszkanie-warszawa', groups=groups)
report('wynajem-mieszkanie-krakow', groups=groups)
report('wynajem-mieszkanie-gdansk', groups=groups)
report('wynajem-mieszkanie-poznan', groups=groups)

# sprzedaz mieszkania - pierwotny
report(
    'sprzedaz-mieszkanie-wroclaw',
    file_name='sprzedaz-mieszkanie-pierwotny-wroclaw',
    **primary_params
)
report(
    'sprzedaz-mieszkanie-warszawa',
    file_name='sprzedaz-mieszkanie-pierwotny-warszawa',
    **primary_params
)
report(
    'sprzedaz-mieszkanie-krakow',
    file_name='sprzedaz-mieszkanie-pierwotny-krakow',
    **primary_params
)
report(
    'sprzedaz-mieszkanie-gdansk',
    file_name='sprzedaz-mieszkanie-pierwotny-gdansk',
    **primary_params
)
report(
    'sprzedaz-mieszkanie-poznan',
    file_name='sprzedaz-mieszkanie-pierwotny-poznan',
    **primary_params
)

# sprzedaz mieszkania - wtórny
report(
    'sprzedaz-mieszkanie-wroclaw',
    file_name='sprzedaz-mieszkanie-wtorny-wroclaw',
    **secondary_params
)
report(
    'sprzedaz-mieszkanie-warszawa',
    file_name='sprzedaz-mieszkanie-wtorny-warszawa',
    **secondary_params
)
report(
    'sprzedaz-mieszkanie-krakow',
    file_name='sprzedaz-mieszkanie-wtorny-krakow',
    **secondary_params
)
report(
    'sprzedaz-mieszkanie-gdansk',
    file_name='sprzedaz-mieszkanie-wtorny-gdansk',
    **secondary_params
)
report(
    'sprzedaz-mieszkanie-poznan',
    file_name='sprzedaz-mieszkanie-wtorny-poznan',
    **secondary_params
)

# sprzedaż działki
report(
    'sprzedaz-dzialka-wroclaw',
    **plot_params
)
report(
    'sprzedaz-dzialka-warszawa',
    **plot_params
)
report(
    'sprzedaz-dzialka-krakow',
    **plot_params
)
report(
    'sprzedaz-dzialka-gdansk',
    **plot_params
)
report(
    'sprzedaz-dzialka-poznan',
    **plot_params
)
