

from report import report

primary_params = {
    'price_field': 'price_m2',
    'extra_query': {'market': 'primary'}
}
secondary_params = {
    'price_field': 'price_m2',
    'extra_query': {'market': 'secondary'}
}

# wynajem mieszkanie
report('wynajem-mieszkanie-wroclaw')
report('wynajem-mieszkanie-warszawa')
report('wynajem-mieszkanie-krakow')
report('wynajem-mieszkanie-gdansk')

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

# sprzedaz mieszkania - wtórny
report(
    'sprzedaz-mieszkanie-wroclaw',
    file_name='sprzedaz-mieszkanie-wtorny-wroclaw',
    **primary_params
)
report(
    'sprzedaz-mieszkanie-warszawa',
    file_name='sprzedaz-mieszkanie-wtorny-warszawa',
    **primary_params
)
report(
    'sprzedaz-mieszkanie-krakow',
    file_name='sprzedaz-mieszkanie-wtorny-krakow',
    **primary_params
)
report(
    'sprzedaz-mieszkanie-gdansk',
    file_name='sprzedaz-mieszkanie-wtorny-gdansk',
    **primary_params
)
