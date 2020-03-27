import React, { FC } from 'react';
import { Table } from 'antd';
import * as _ from 'lodash';


export const ATable: FC<{ data: DataRow[] }> = ({
  data
}) => (
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
);
