import * as React from 'react';
import { Layout, Menu, Icon, BackTop } from 'antd';
import { withRouter } from 'react-router-dom';

import { RouteComponentProps } from 'react-router';
import renderRouters from '../router';
import Notice from '../components/Notice';
import AppContextProvider from '../context/appContextProvider';
import { tabKeyRouterMap, GITHUB_URL, COPYRIGHT } from '../constants';
import util from '../utils';
import './App.less';
import { requestPvs } from '../utils/request';

const { Header, Footer } = Layout;

const { useState, useEffect } = React;

const App: React.FunctionComponent<RouteComponentProps> = ({
  history,
  location
}) => {
  const gotoGithub = () => {
    window.location.href = GITHUB_URL;
  };
  const [pvs, changePvs] = useState(0);

  useEffect(() => {
    requestPvs(
      (pvNumber: number): void => {
        changePvs(pvNumber);
      }
    );
  }, []);

  // 根据理由选中对应 menu 项
  const defaultYear = [tabKeyRouterMap[location.pathname]];

  const clickMenu = ({ key }: { key: string }) => {
    history.push(tabKeyRouterMap[key]);
  };

  // 获取年份列表
  const yearList = util.getYearList();
  console.warn(location, history);

  return (
    <AppContextProvider>
      <BackTop />
      <Layout>
        <Header style={{ backgroundColor: 'white' }}>
          <div className="header-item">
            <span className="header-item-pv">{`累计查询：${pvs}次`}</span>
            <Notice />
            <Icon type="github" onClick={gotoGithub} />
          </div>
          <Menu
            theme="light"
            mode="horizontal"
            selectedKeys={defaultYear}
            onClick={clickMenu}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="home">
              <Icon type="home" />
              首页
            </Menu.Item>
            {yearList.map(year => {
              return (
                <Menu.Item key={year}>
                  <Icon type="calendar" />
                  {`${year}年`}
                </Menu.Item>
              );
            })}
          </Menu>
        </Header>
        {renderRouters()}
        <Footer style={{ textAlign: 'center' }}>{COPYRIGHT}</Footer>
      </Layout>
    </AppContextProvider>
  );
};

export default withRouter(App);
