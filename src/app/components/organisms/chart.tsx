import React, { FC, useEffect, useState } from 'react';
import { Table, Row, Col, Card } from 'antd';
import * as _ from 'lodash';

import { LineChart, XAxis, Tooltip, CartesianGrid, Line, YAxis, Legend } from 'recharts';

import { CHART_COLORS } from '../../constants'

interface Props {
  data: DataRow[]
  title: string
}

const BREAKPOINT = 992;

const OChart: FC<Props> = ({ data, title }) => {

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
    <Card title={title}>
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
            <Line type="monotone" dataKey="2019" stroke={CHART_COLORS[0]} yAxisId={0} />
            <Line type="monotone" dataKey="2020" stroke={CHART_COLORS[1]} yAxisId={0} />
          </LineChart>
        </Col>
      </Row>

      <Row justify="center" gutter={[0, 32]}>
        <Col xs={24} lg={12}>
          <Table
            dataSource={data}
            columns={[
              {key: 'name', title: 'Data', dataIndex: 'name'},
              {key: '2019', title: '2019', dataIndex: '2019'},
              {key: '2020', title: '2020', dataIndex: '2020'},
            ]}
            pagination={false}
            size="small"
            summary={(pageData) => (
              <tr>
                <td><strong>Suma:</strong></td>
                <td><strong>{ _.sumBy(pageData, '2019') }</strong></td>
                <td><strong>{ _.sumBy(pageData, '2020') }</strong></td>
              </tr>
            )}
          />
        </Col>
      </Row>
    </Card>
  );
}

export { OChart }
