import json
from os import path


class DataSaver:

    def __init__(self, file_name):
        self.file_path = '../../src/data/estates/{}.json'.format(file_name)

    def get_existing_data(self):
        data = []
        if path.exists(self.file_path):
            with open(self.file_path, 'r') as fp:
                data = json.load(fp)
        return data

    def update_data(self, data, row):
        name_list = list(map(lambda x: x['name'], data))
        if row['name'] in name_list:
            name_index = name_list.index(row['name'])
            data[name_index] = row
        else:
            data.append(row)
        return data

    def save(self, row):
        existing_data = self.get_existing_data()
        data = self.update_data(existing_data, row)
        with open(self.file_path, 'w') as fp:
            json.dump(data, fp)
