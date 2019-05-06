import * as React from 'react';
import { Layout, Menu, Icon, BackTop } from 'antd';
import { withRouter } from 'react-router-dom';
import renderRouters from '../router';

import Notice from '../components/Notice';
import './App.less';
import AppContextProvider from '../context/appContextProvider';

const { Header, Footer } = Layout;

function App(props) {
  function gotoGithub() {
    window.location.href = 'https://github.com/yhlben/cdfang-spider';
  }

  let defaltYear = ['home'];

  switch (props.location.pathname) {
    case '/2019':
      defaltYear = ['2019'];
      break;
    case '/2018':
      defaltYear = ['2018'];
      break;
    default:
      defaltYear = ['home'];
  }

  const clickMenu = ({ key }) => {
    switch (key) {
      case '2019':
        props.history.push('/2019');
        break;
      case '2018':
        props.history.push('/2018');
        break;
      default:
        props.history.push('/');
    }
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
