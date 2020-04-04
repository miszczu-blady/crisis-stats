import React, { FC, useEffect, useState } from 'react';
import { Row, Col, Card } from 'antd';
import * as _ from 'lodash';

import { LineChart, XAxis, Tooltip, CartesianGrid, Line, YAxis, Legend } from 'recharts';

import { ESTATE_CHART_COLORS } from '../../constants'

interface Props {
  dataPrices: any[]
  dataCount: any[]
  titlePrices: string
  titleCount: string
}

const BREAKPOINT = 992;

const OEstateChart: FC<Props> = ({ dataPrices, dataCount, titlePrices, titleCount }) => {

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
    <Card title={titlePrices}>
      <Row gutter={[0, 32]}>
        <Col span={24}>
          <LineChart
            width={size[0]}
            height={size[1]}
            layout="horizontal"
            data={dataPrices}
          >
            <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
            <XAxis dataKey="name" />
            <YAxis type="number" unit="zł" />
            <Legend />
            <Tooltip />
            <Line name="1-pokojowe" type="monotone" dataKey="rooms_1" stroke={ESTATE_CHART_COLORS[0]} yAxisId={0} />
            <Line name="2-pokojowe" type="monotone" dataKey="rooms_2" stroke={ESTATE_CHART_COLORS[1]} yAxisId={0} />
            <Line name="3-pokojowe" type="monotone" dataKey="rooms_3" stroke={ESTATE_CHART_COLORS[2]} yAxisId={0} />
            <Line name="4-pokojowe i większe" type="monotone" dataKey="rooms_4" stroke={ESTATE_CHART_COLORS[3]} yAxisId={0} />
          </LineChart>
        </Col>
      </Row>
    </Card>

    <Card title={titleCount}>
      <Row gutter={[0, 32]}>
        <Col span={24}>
          <LineChart
            width={size[0]}
            height={size[1]}
            layout="horizontal"
            data={dataCount}
          >
            <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
            <XAxis dataKey="name" />
            <YAxis type="number" />
            <Legend />
            <Tooltip />
            <Line name="1-pokojowe" type="monotone" dataKey="rooms_1" stroke={ESTATE_CHART_COLORS[0]} yAxisId={0} />
            <Line name="2-pokojowe" type="monotone" dataKey="rooms_2" stroke={ESTATE_CHART_COLORS[1]} yAxisId={0} />
            <Line name="3-pokojowe" type="monotone" dataKey="rooms_3" stroke={ESTATE_CHART_COLORS[2]} yAxisId={0} />
            <Line name="4-pokojowe i większe" type="monotone" dataKey="rooms_4" stroke={ESTATE_CHART_COLORS[3]} yAxisId={0} />
          </LineChart>
        </Col>
      </Row>
    </Card>
    </>
  );
}

export { OEstateChart }
