import * as React from 'react';
import { Layout, Menu, Icon, BackTop } from 'antd';
import { withRouter } from 'react-router-dom';

import renderRouters from '../router';
import Notice from '../components/Notice';
import AppContextProvider from '../context/appContextProvider';
import { tabKeyRouterMap } from '../constants';
import './App.less';

const { Header, Footer } = Layout;

function App({ history, location }) {
  function gotoGithub() {
    window.location.href = 'https://github.com/yhlben/cdfang-spider';
  }

  // 根据理由选中对应 menu 项
  const defaltYear = [tabKeyRouterMap[location.pathname]];

  const clickMenu = ({ key }) => {
    history.push(tabKeyRouterMap[key]);
  };

  return (
    <AppContextProvider>
      <BackTop />
      <Layout>
        <Header style={{ backgroundColor: 'white' }}>
          <div className="header-item">
            <Notice />
            <Icon type="github" onClick={gotoGithub} />
          </div>
          <Menu
            theme="light"
            mode="horizontal"
            selectedKeys={defaltYear}
            onClick={clickMenu}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="home">
              <Icon type="home" />
              首页
            </Menu.Item>
            <Menu.Item key="2019">
              <Icon type="calendar" />
              2019 年
            </Menu.Item>
            <Menu.Item key="2018">
              <Icon type="calendar" />
              2018 年
            </Menu.Item>
            <Menu.Item key="2017">
              <Icon type="calendar" />
              2017 年
            </Menu.Item>
          </Menu>
        </Header>
        {renderRouters()}
        <Footer style={{ textAlign: 'center' }}>
          Copyright 2018 - 2019 yhlben. All Rights Reserved
        </Footer>
      </Layout>
    </AppContextProvider>
  );
}

export default withRouter(App);
