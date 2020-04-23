import argparse

transactions = [
    'wynajem',
    'sprzedaz'
]
property_types = [
    'mieszkanie',
    'dom',
    'dzialka'
]
cities = [
    'wroclaw',
    'warszawa',
    'krakow',
    'gdansk',
    'poznan'
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
parser.add_argument("--distance", type=int, help="distace",
                    choices=[0, 5, 10, 15, 25, 50, 75])
parser.add_argument("--all", default=False,
                    help="go through all pages and skip existing ads",
                    action="store_true")
args = parser.parse_args()
