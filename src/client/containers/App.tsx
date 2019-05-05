import * as React from 'react';
import * as _ from 'lodash';
import { Layout, Menu, Icon, Tabs, BackTop } from 'antd';

import gql from 'graphql-tag';
import util from '../utils/index';

import ChartPanel from '../components/ChartPanel';
import Table from '../components/WholeTable';
import StatisticCard from '../components/StatisticCard';
import Notice from '../components/Notice';
import AreaBar from '../components/AreaBar';
import Loading from '../components/Loading';
import config from '../config';
import { AppContext, globalData } from '../context/appContext';
import './App.less';

interface IareaHouse {
  区域: string;
  房源: number;
}

interface IareaBuilder {
  区域: string;
  楼盘数: number;
}

const { lazy, Suspense, useEffect, useState } = React;

const CurrentHouse = lazy(() => import('../components/CurrentHouse'));
const { Header, Footer, Content } = Layout;
const { TabPane } = Tabs;

function App() {
  const { getGraphqlClient } = config;
  const [appState, changeInitData] = useState(globalData);

  function gotoGithub() {
    window.location.href = 'https://github.com/yhlben/cdfang-spider';
  }

  function reloadData(year = 0): void {
    getGraphqlClient()
      .query({
        query: gql`
          {
            allHouses(year: ${year}) {
              _id
              area
              name
              number
              beginTime
              endTime
              status
            }
          }
        `
      })
      .then(result => {
        changeInitData({ ...appState, allData: result.data.allHouses });
      });
  }

  function changeTab(activityKey: string): void {
    appState.changeActivityKey(Number.parseInt(activityKey, 10));
  }

  const clickMenu = ({ key }) => {
    switch (key) {
      case '2':
        appState.changeSelectedYear(2019);
        reloadData(2019);
        break;
      case '3':
        appState.changeSelectedYear(2018);
        reloadData(2018);
        break;
      default:
        appState.changeSelectedYear(0);
        reloadData();
    }
  };

  useEffect(() => {
    reloadData();
  }, []);

  const { allData } = appState;
  const areas = _.groupBy(allData, (item: Idata) => item.area);
  const areasList = Object.keys(areas);
  /* eslint-disable react/no-array-index-key */
  const tabpanels = util
    .sortArea(areasList)
    .map((item: string, index: number) => (
      <TabPane tab={item} key={item}>
        <ChartPanel
          data={areas[item]}
          panelIndex={index}
          activityKey={appState.activityKey}
        />
      </TabPane>
    ));
  const chartHouseData: IareaHouse[] = [];
  const chartBuildData: IareaBuilder[] = [];
  Object.keys(areas).forEach(key => {
    chartHouseData.push({ 区域: key, 房源: _.sumBy(areas[key], 'number') });
    chartBuildData.push({ 区域: key, 楼盘数: areas[key].length });
  });

  return (
    <AppContext.Provider value={appState}>
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
            defaultSelectedKeys={['1']}
            onClick={clickMenu}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1">
              <Icon type="home" />
              首页
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="calendar" />
              2019年
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="calendar" />
              2018年
            </Menu.Item>
          </Menu>
        </Header>
        <Content className="content">
          <Suspense fallback={<Loading />}>
            <CurrentHouse />
          </Suspense>
          <StatisticCard />
          <div className="content-graph-bar">
            <Tabs defaultActiveKey="6" onChange={changeTab}>
              {tabpanels}
            </Tabs>
          </div>
          <div className="content-areabar">
            <div className="content-areabar-title">整体统计</div>
            <AreaBar
              title="房源数排序图"
              data={chartHouseData}
              xAxis="区域"
              yAxis="房源"
              desc
            />
            <AreaBar
              title="楼盘数排序图"
              data={chartBuildData}
              xAxis="区域"
              yAxis="楼盘数"
              desc
            />
          </div>
          <div className="content-graph-table">
            <Table areaList={areasList} />
          </div>
        </Content>

        <Footer style={{ textAlign: 'center' }}>
          Copyright 2018 - 2019 yhlben. All Rights Reserved
        </Footer>
      </Layout>
    </AppContext.Provider>
  );
}

export default App;
