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
    title: 'Kawalerki',
    children: [
      {
        title: 'Średnia cena',
        dataIndex: ['rooms_1', 'avg_price'],
        key: 'rooms_1-price',
      },
      {
        title: 'Liczba ogłoszeń',
        dataIndex: ['rooms_1', 'ads_count'],
        key: 'rooms_1-count',
      }
    ]
  },
  {
    title: '2-pokojowe',
    children: [
      {
        title: 'Średnia cena',
        dataIndex: ['rooms_2', 'avg_price'],
        key: 'rooms_2-price',
      },
      {
        title: 'Liczba ogłoszeń',
        dataIndex: ['rooms_2', 'ads_count'],
        key: 'rooms_2-count',
      }
    ]
  },
  {
    title: '3-pokojowe',
    children: [
      {
        title: 'Średnia cena',
        dataIndex: ['rooms_3', 'avg_price'],
        key: 'rooms_3-price',
      },
      {
        title: 'Liczba ogłoszeń',
        dataIndex: ['rooms_3', 'ads_count'],
        key: 'rooms_3-count',
      }
    ]
  },
  {
    title: '4-pokojowe i większe',
    children: [
      {
        title: 'Średnia cena',
        dataIndex: ['rooms_4', 'avg_price'],
        key: 'rooms_4-price',
      },
      {
        title: 'Liczba ogłoszeń',
        dataIndex: ['rooms_4', 'ads_count'],
        key: 'rooms_4-count',
      }
    ]
  }

]

const OEstateChart: FC<Props> = ({ data, title }) => {

  const getCurrentSize = (): [number, number] => ([
    window.innerWidth > BREAKPOINT ? window.innerWidth * 0.7 : window.innerWidth * 0.9,
    window.innerWidth > BREAKPOINT ? window.innerWidth * 0.7 * 0.5 : window.innerWidth * 0.9 * 0.5
  ])
  const [size, setSize] = useState<[number, number]>(getCurrentSize())
  useEffect(() => {
    const handleWindowResize = () => setSize(getCurrentSize())
    window.addEventListener('resize', _.debounce(handleWindowResize, 300));
  })

  return (
    <>
    <Card title={`${title} - Cena`}>
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
            <Line name="1-pokojowe" type="monotone" dataKey="rooms_1.avg_price" stroke={ESTATE_CHART_COLORS[0]} yAxisId={0} />
            <Line name="2-pokojowe" type="monotone" dataKey="rooms_2.avg_price" stroke={ESTATE_CHART_COLORS[1]} yAxisId={0} />
            <Line name="3-pokojowe" type="monotone" dataKey="rooms_3.avg_price" stroke={ESTATE_CHART_COLORS[2]} yAxisId={0} />
            <Line name="4-pokojowe i większe" type="monotone" dataKey="rooms_4.avg_price" stroke={ESTATE_CHART_COLORS[3]} yAxisId={0} />
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
            <Line name="1-pokojowe" type="monotone" dataKey="rooms_1.ads_count" stroke={ESTATE_CHART_COLORS[0]} yAxisId={0} />
            <Line name="2-pokojowe" type="monotone" dataKey="rooms_2.ads_count" stroke={ESTATE_CHART_COLORS[1]} yAxisId={0} />
            <Line name="3-pokojowe" type="monotone" dataKey="rooms_3.ads_count" stroke={ESTATE_CHART_COLORS[2]} yAxisId={0} />
            <Line name="4-pokojowe i większe" type="monotone" dataKey="rooms_4.ads_count" stroke={ESTATE_CHART_COLORS[3]} yAxisId={0} />
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
            bordered
          />
        </Col>
      </Row>
    </Card>
    </>
  );
}

export { OEstateChart }
