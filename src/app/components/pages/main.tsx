import React, { FC, useState } from 'react';
import * as _ from 'lodash';
import { Layout, Menu } from 'antd';

import { OChart } from '../organisms/chart';

import dataClosed from '../../../data/closed.json';
import dataSuspensed from '../../../data/suspended.json';

const { Header, Content, Sider } = Layout;

type SelectedItem = 'closed' | 'suspended' | 'together';

const MainPage: FC = () => {
  const [selectedItem, setSelectedItem] = useState<SelectedItem>('closed')

  const titles = {
    closed: 'Liczba zamkniętych działalności gospodarczych 2020 vs. 2019',
    suspended: 'Liczba zawieszonych działalności gospodarczych 2020 vs. 2019',
    together: 'Liczba zamkniętych i zamkniętych działalności gospodarczych 2020 vs. 2019',
  }

  const getData = (selectedItem: SelectedItem) => {
    if (selectedItem === 'closed') return dataClosed;
    else if (selectedItem === 'suspended') return dataSuspensed;
    else return _.zipWith(dataClosed, dataSuspensed, (closed, suspended) => ({
      name: closed.name,
      '2019': closed['2019'] + suspended['2019'],
      '2020': closed['2020'] && suspended['2020']
        ? closed['2020'] + suspended['2020']
        : (closed['2020'] || suspended['2020']),
  }));
  }

  return <Layout>
    <Header className="header">
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['ceidg']}
      >
        <Menu.Item key="ceidg">CEIDG</Menu.Item>
      </Menu>
    </Header>
    <Content>
      <Layout>
        <Sider width={200}>
          <Menu
            mode="inline"
            selectedKeys={[selectedItem]}
            style={{ height: '100%' }}
            onSelect={({ key }) => setSelectedItem(key as SelectedItem)}
          >
            <Menu.Item key="closed">Zamknięte</Menu.Item>
            <Menu.Item key="suspended">Zawieszone</Menu.Item>
            <Menu.Item key="together">Razem</Menu.Item>
          </Menu>
        </Sider>
        <Content style={{ background: '#fff', minHeight: 680, padding: 20 }}>
          <OChart
            data={getData(selectedItem)}
            title={titles[selectedItem]}
          />
        </Content>
      </Layout>
    </Content>
  </Layout>
}

export { MainPage }
