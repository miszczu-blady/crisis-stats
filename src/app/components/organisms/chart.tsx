import React, { FC } from 'react';
import { Typography, Table } from 'antd';
import * as _ from 'lodash';

import { LineChart, XAxis, Tooltip, CartesianGrid, Line, YAxis, Legend } from 'recharts';

const { Title } = Typography;

interface Props {
  data: Array<any>
  title: string
}

const OChart: FC<Props> = ({
  data,
  title
}) => {
  return <div>
    <Title level={2}>{title}</Title>
    <LineChart width={1000} height={500} data={data}>
      <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
      <XAxis dataKey="name" />
      <YAxis type="number" />
      <Legend />
      <Tooltip />
      <Line type="monotone" dataKey="2019" stroke="#8884d8" yAxisId={0} />
      <Line type="monotone" dataKey="2020" stroke="#82ca9d" yAxisId={0} />
    </LineChart>

    <div style={{width: 600, marginTop: 40}}>
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
    </div>
  </div>
}

export { OChart }
