import * as React from 'react';
import * as _ from 'lodash';
import { Layout, Tabs } from 'antd';

import gql from 'graphql-tag';
import util from '../utils/index';

import ChartPanel from '../components/ChartPanel';
import Table from '../components/WholeTable';
import StatisticCard from '../components/StatisticCard';
import AreaBar from '../components/AreaBar';
import Loading from '../components/Loading';
import config from '../config';
import { AppContext } from '../context/appContext';
import './App.less';

interface IareaHouse {
  区域: string;
  房源: number;
}

interface IareaBuilder {
  区域: string;
  楼盘数: number;
}

interface IallHouses {
  allHouses: cdFang.IhouseData[];
}

const { lazy, Suspense, useEffect, useContext } = React;

const CurrentHouse = lazy(() => import('../components/CurrentHouse'));
const { Content } = Layout;
const { TabPane } = Tabs;

function CurrentYear(props) {
  const { getGraphqlClient } = config;
  const appState = useContext(AppContext);

  function reloadData(year = 0): void {
    getGraphqlClient()
      .query<IallHouses>({
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
        appState.changeData(result.data.allHouses);
      });
  }

  function changeTab(activityKey: string): void {
    appState.changeActivityKey(activityKey);
  }

  useEffect(() => {
    reloadData(props.year);
  }, []);

  const { allData } = appState;
  const areas = _.groupBy(allData, (item: cdFang.IhouseData) => item.area);
  const areasList = Object.keys(areas);
  const tabpanels = util
    .sortArea(areasList)
    .map((item: string, index: number) => (
      <TabPane tab={item} key={item}>
        <ChartPanel
          data={areas[item]}
          panelKey={item}
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
    <Content className="content">
      <Suspense fallback={<Loading />}>
        <CurrentHouse />
      </Suspense>
      <StatisticCard />
      <div className="content-graph-bar">
        <Tabs defaultActiveKey={appState.activityKey} onChange={changeTab}>
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
  );
}

export default CurrentYear;
