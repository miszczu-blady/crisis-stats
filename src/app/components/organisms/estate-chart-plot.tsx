import React, { FC, useEffect, useState } from 'react';
import { Table, Row, Col, Card } from 'antd';
import * as _ from 'lodash';

import { LineChart, XAxis, Tooltip, CartesianGrid, Line, YAxis, Legend } from 'recharts';

import { ESTATE_CHART_COLORS } from '../../constants'

interface Props {
  data: any[]
  title: string
}

const BREAKPOINT = 992;

const columns = [
  {
    title: 'Tydzień',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '400-1000 mkw',
    children: [
      {
        title: 'Średnia cena',
        dataIndex: ['400-1000', 'avg_price'],
        key: '400-1000-price',
      },
      {
        title: 'Liczba ogłoszeń',
        dataIndex: ['400-1000', 'ads_count'],
        key: '400-1000-count',
      }
    ]
  },
  {
    title: '1000-1600 mkw',
    children: [
      {
        title: 'Średnia cena',
        dataIndex: ['1000-1600', 'avg_price'],
        key: '1000-1600-price',
      },
      {
        title: 'Liczba ogłoszeń',
        dataIndex: ['1000-1600', 'ads_count'],
        key: '1000-1600-count',
      }
    ]
  },
  {
    title: '1600-4000mkw',
    children: [
      {
        title: 'Średnia cena',
        dataIndex: ['1600-4000', 'avg_price'],
        key: '1600-4000-price',
      },
      {
        title: 'Liczba ogłoszeń',
        dataIndex: ['1600-4000', 'ads_count'],
        key: '1600-4000-count',
      }
    ]
  },
  {
    title: 'powyżej 4000mkw',
    children: [
      {
        title: 'Średnia cena',
        dataIndex: ['4000', 'avg_price'],
        key: '4000-price',
      },
      {
        title: 'Liczba ogłoszeń',
        dataIndex: ['4000', 'ads_count'],
        key: '4000-count',
      }
    ]
  }

]

const OEstateChartPlot: FC<Props> = ({ data, title }) => {

  const getCurrentSize = (): [number, number] => ([
    window.innerWidth > BREAKPOINT ? window.innerWidth * 0.7 : window.innerWidth * 0.9,
    window.innerWidth > BREAKPOINT ? window.innerWidth * 0.7 * 0.5 : window.innerWidth * 0.9 * 0.5
  ])
  const [size, setSize] = useState<[number, number]>(getCurrentSize())
  useEffect(() => {
    const handleWindowResize = () => setSize(getCurrentSize())
    window.addEventListener('resize', _.debounce(handleWindowResize, 300));
  })

  console.log('OEstateChartPlot.data')
  console.log(data)
  return (
    <>
    <Card title={`${title} - Średnia cena za mkw`}>
      <Row gutter={[0, 32]}>
        <Col span={24}>
          <LineChart
            width={size[0]}
            height={size[1]}
            layout="horizontal"
            data={data}
          >
            <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
            <XAxis dataKey="name" />
            <YAxis type="number" unit="zł" />
            <Legend />
            <Tooltip />
            <Line name="400-1000 mkw" type="monotone" dataKey="400-1000.avg_price" stroke={ESTATE_CHART_COLORS[0]} yAxisId={0} />
            <Line name="1000-1600 mkw" type="monotone" dataKey="1000-1600.avg_price" stroke={ESTATE_CHART_COLORS[1]} yAxisId={0} />
            <Line name="1600-4000 mkw" type="monotone" dataKey="1600-4000.avg_price" stroke={ESTATE_CHART_COLORS[2]} yAxisId={0} />
            <Line name="powyżej 4000 mkw" type="monotone" dataKey="4000.avg_price" stroke={ESTATE_CHART_COLORS[3]} yAxisId={0} />
          </LineChart>
        </Col>
      </Row>
    </Card>

    <Card title={`${title} - Liczba ogłoszeń`}>
      <Row gutter={[0, 32]}>
        <Col span={24}>
          <LineChart
            width={size[0]}
            height={size[1]}
            layout="horizontal"
            data={data}
          >
            <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
            <XAxis dataKey="name" />
            <YAxis type="number" />
            <Legend />
            <Tooltip />
            <Line name="400-1000 mkw" type="monotone" dataKey="400-1000.ads_count" stroke={ESTATE_CHART_COLORS[0]} yAxisId={0} />
            <Line name="1000-1600 mkw" type="monotone" dataKey="1000-1600.ads_count" stroke={ESTATE_CHART_COLORS[1]} yAxisId={0} />
            <Line name="1600-4000 mkw" type="monotone" dataKey="1600-4000.ads_count" stroke={ESTATE_CHART_COLORS[2]} yAxisId={0} />
            <Line name="powyżej 4000 mkw" type="monotone" dataKey="4000.ads_count" stroke={ESTATE_CHART_COLORS[3]} yAxisId={0} />
          </LineChart>
        </Col>
      </Row>
    </Card>

    <Card title={`${title} - Dane`}>
      <Row gutter={[0, 32]}>
        <Col span={24}>
          <Table
            dataSource={data}
            columns={columns}
            pagination={false}
            size="small"
            bordered
          />
        </Col>
      </Row>
    </Card>
    </>
  );
}

export { OEstateChartPlot }
