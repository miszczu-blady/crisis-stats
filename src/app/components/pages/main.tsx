import React, { FC, useState } from 'react';
import { Layout, Menu } from 'antd';

import { OChart } from '../organisms/chart';
import { ODashboard } from '../organisms/dashboard';
import { zip } from '../../utils';

import dataClosed from '../../../data/closed.json';
import dataSuspensed from '../../../data/suspended.json';
import dataOpened from '../../../data/opened.json';
import dataReopened from '../../../data/reopened.json';

const { Header, Content, Sider } = Layout;

const MainPage: FC = () => {
  const [selectedItem, setSelectedItem] = useState<SelectedItem | 'dashboard'>('dashboard')

  const titles = {
    closed: 'Liczba zakończonych działalności gospodarczych 2020 vs. 2019',
    suspended: 'Liczba zawieszonych działalności gospodarczych 2020 vs. 2019',
    opened: 'Liczba założonych działalności gospodarczych 2020 vs. 2019',
    reopened: 'Liczba wznowionych działalności gospodarczych 2020 vs. 2019',
    "closed-suspended": 'Liczba zakończonych i zawieszonych działalności gospodarczych 2020 vs. 2019',
    "opened-reopened": 'Liczba założonych i wznowionych działalności gospodarczych 2020 vs. 2019',
  }

  const getData = (selectedItem: SelectedItem) => {
    if (selectedItem === 'closed') return dataClosed;
    else if (selectedItem === 'suspended') return dataSuspensed;
    else if (selectedItem === 'closed-suspended') return zip(dataClosed, dataSuspensed);
    else if (selectedItem === 'opened') return dataOpened;
    else if (selectedItem === 'reopened') return dataReopened;
    else if (selectedItem === 'opened-reopened') return zip(dataOpened, dataReopened);
    return []
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
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          width={200}
        >
          <Menu
            mode="inline"
            selectedKeys={[selectedItem]}
            style={{ height: '100%' }}
            onSelect={({ key }) => setSelectedItem(key as SelectedItem)}
          >
            <Menu.Item key="dashboard">Dashboard</Menu.Item>
            <Menu.Item key="closed">Zakończone</Menu.Item>
            <Menu.Item key="suspended">Zawieszone</Menu.Item>
            <Menu.Item key="opened">Założone</Menu.Item>
            <Menu.Item key="reopened">Wznowione</Menu.Item>
            <Menu.Item key="closed-suspended">Zamknięte & Zawieszone</Menu.Item>
            <Menu.Item key="opened-reopened">Założone & Wznowione</Menu.Item>
          </Menu>
        </Sider>
        <Content style={{ minHeight: 680, padding: 20 }}>
          { selectedItem === 'dashboard'
            ? <ODashboard />
            : <OChart data={getData(selectedItem)} title={titles[selectedItem]}/>
          }
        </Content>
      </Layout>
    </Content>
  </Layout>
}

export { MainPage }
