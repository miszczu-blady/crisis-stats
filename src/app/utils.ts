import * as _ from 'lodash';

export const zip = (setA: DataRow[], setB: DataRow[]) =>
  _.zipWith(setA, setB, (elementA, elementB) => ({
  name: elementA.name,
  '2019': elementA['2019'] + elementB['2019'],
  '2020': elementA['2020'] && elementB['2020']
  ? elementA['2020'] + elementB['2020']
  : (elementA['2020'] || elementB['2020'])
}));


export const getLastDays = (data: DataRow[], days: number) => {
  const end = _.findLastIndex(data, item => item['2020'] !== null)
  if (!end) return []
  const begin = end >= days - 1 ? end - days + 1 : 0
  return data.slice(begin, end + 1)
}

