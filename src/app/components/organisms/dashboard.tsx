import React, { FC } from 'react';
import { Row, Col, Card, Statistic } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import * as _ from 'lodash';

import { LineChart, XAxis, Tooltip, CartesianGrid, Line, YAxis, Legend } from 'recharts';

import { ATable } from '../atoms/table';
import dataClosed from '../../../data/closed.json';
import dataSuspensed from '../../../data/suspended.json';
import dataOpened from '../../../data/opened.json';
import dataReopened from '../../../data/reopened.json';

import { ARROW_COLORS, CHART_COLORS } from '../../constants'
import { getLastDays, zip } from '../../utils'

interface Props {
  data: DataRow[]
}

const OChartCell: FC<Props> = ({
  data
}) => {
  return (
    <Row>
      <LineChart
        width={500}
        height={250}
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
    </Row>
  );
}

const OStatsCell: FC<Props> = ({
  data
}) => {
  const count2020 = _.sumBy(data, "2020")
  const count2019 = _.sumBy(data, "2019")

  const diff = count2020 - count2019
  const color = diff > 0
    ? ARROW_COLORS.GREEN
    : diff < 0
      ? ARROW_COLORS.RED
      : ARROW_COLORS.GREY

  const prefix = diff > 0
    ? <ArrowUpOutlined />
    : diff < 0
      ? <ArrowDownOutlined />
      : null

  const percentage = count2019 > count2020
    ? (count2019 - count2020) / count2019 * 100
    : (count2020 - count2019) / count2019 * 100

  return (
    <Row justify="center" gutter={64}>
      <Col>
        <Statistic
          title="2019"
          value={count2019}
          valueStyle={{ color: CHART_COLORS[0] }}
        />
      </Col>

      <Col>
        <Statistic
          title="2020"
          value={count2020}
          valueStyle={{ color: CHART_COLORS[1] }}
        />
      </Col>

      <Col>
        <Statistic
          title="Zmiana"
          value={percentage}
          precision={1}
          valueStyle={{ color }}
          prefix={prefix}
          suffix="%"
        />
      </Col>
    </Row>
  );
}

const OTableCell: FC<Props> = ({
  data
}) => {
  return (
    <Row>
      <Col span={24}>
        <ATable data={data} />
      </Col>
    </Row>
  );
}

const ODashboard: FC = () => {
  const dataClosedSuspended = getLastDays(zip(dataClosed, dataSuspensed), 7);
  const dataOpenedReopened = getLastDays(zip(dataOpened, dataReopened), 7);

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col lg={12} xs={24}>
          <Card title="Zakończone i zamknięte (ostatnie 7 dni)">
            <OStatsCell data={dataClosedSuspended} />
            <OChartCell data={dataClosedSuspended} />
            <OTableCell data={dataClosedSuspended} />
          </Card>
        </Col>
        <Col lg={12} xs={24}>
          <Card title="Założone i wznowione (ostatnie 7 dni)">
            <OStatsCell data={dataOpenedReopened} />
            <OChartCell data={dataOpenedReopened} />
            <OTableCell data={dataOpenedReopened} />
          </Card>
        </Col>
      </Row>
    </>
  );
}


export { ODashboard }
