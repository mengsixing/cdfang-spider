import * as React from 'react';
import { Layout, Menu, Icon, BackTop } from 'antd';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { hot } from 'react-hot-loader/root';

import renderRouters from '../router';
import Notice from '../components/Notice';
import {
  tabKeyRouterMap,
  GITHUB_URL,
  COPYRIGHT,
  BEIAN_ICP
} from '../constants';
import util from '../utils';
import { requestPvs, requestData } from '../utils/request';
import { AppContext } from '../context/appContext';
import './App.less';

const { useState, useEffect, useContext } = React;
const { Header, Footer } = Layout;

const App: React.FunctionComponent<RouteComponentProps> = ({
  history,
  location
}) => {
  const gotoGithub = () => {
    window.location.href = GITHUB_URL;
  };
  const appState = useContext(AppContext);
  const [pvs, changePvs] = useState(0);

  const selectedYear = tabKeyRouterMap[location.pathname];

  const requestDataWrapper = (year: string) => {
    appState.changeLoading(true);
    requestData(year, (allHouses: cdFang.IhouseData[]) => {
      appState.changeData(allHouses);
      appState.changeLoading(false);
    });
  };

  useEffect(() => {
    // 获取 pv
    requestPvs(
      (pvNumber: number): void => {
        changePvs(pvNumber);
      }
    );

    // 获取房源信息
    requestDataWrapper(selectedYear);
  }, []);

  // 根据理由选中对应 menu 项
  const defaultYear = [selectedYear];

  // 路由切换
  const clickMenu = ({ key }: { key: string }) => {
    if (key !== selectedYear) {
      history.push(tabKeyRouterMap[key]);
      requestDataWrapper(key);
    }
  };

  // 获取年份列表
  const yearList = util.getYearList();
  return (
    <div>
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
        <Footer style={{ textAlign: 'center' }}>
          <div>
            <a href="http://www.beian.miit.gov.cn/" target="blank">
              {BEIAN_ICP}
            </a>
          </div>
          <div>{COPYRIGHT}</div>
        </Footer>
      </Layout>
    </div>
  );
};

export default hot(withRouter(App));
