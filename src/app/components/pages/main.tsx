import React, { FC } from 'react';
import { Layout, Menu } from 'antd';

import {
  Link,
  withRouter,
  Route,
  Redirect
} from "react-router-dom";

import { Ceidg } from './ceidg';
import { Estates } from './estates';


const { Header, Content } = Layout;

const MainPage: FC<any> = ({ location }) => {
  return (
    <Layout>
      <Header className="header">
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[location.pathname]}
        >
          <Menu.Item key="/ceidg">
            <Link to="/ceidg">CEIDG</Link>
          </Menu.Item>
          <Menu.Item key="/estates">
            <Link to="/estates">
              Nieruchomości
            </Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content>
        <Route path="/ceidg" component={Ceidg} />
        <Route path="/estates" component={Estates} />
        <Route exact path="/" render={() => <Redirect to="/ceidg" />} />
      </Content>
    </Layout>
  );
}

const MainPageWithRouter = withRouter(props => <MainPage {...props} />);

export { MainPageWithRouter }
