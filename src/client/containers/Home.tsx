import * as React from 'react';
import * as _ from 'lodash';
import { Layout, Col, Row, Tabs } from 'antd';
import * as dayjs from 'dayjs';

import gql from 'graphql-tag';

import config from '../config';
import { AppContext } from '../context/appContext';
import AreaGraph from '../components/AreaGraph';
import WholeTable from '../components/WholeTable';
import StatisticCard from '../components/StatisticCard';
import Rank from '../components/Rank';
import './Home.less';
import Loading from '../components/Loading';
import AreaBar from '../components/AreaBar';
import utils from '../utils';

const { TabPane } = Tabs;

const { lazy, Suspense, useEffect, useContext } = React;
const CurrentHouse = lazy(() => import('../components/CurrentHouse'));

const { Content } = Layout;

function Home(props) {
  const { getGraphqlClient } = config;
  const appState = useContext(AppContext);

  function reloadData(year = 0): void {
    getGraphqlClient()
      .query<cdFang.IallHouses>({
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

  useEffect(() => {
    reloadData(props.year);
  }, []);

  // 构建区域图需要的数据
  const arrayByDay = _.groupBy(appState.allData, item => {
    return dayjs(item.beginTime).format('YYYY-MM');
  });

  const houseData = [];
  const buildData = [];
  Object.keys(arrayByDay).forEach(key => {
    const houseNumber = _.sumBy(arrayByDay[key], 'number');
    buildData.push({
      month: key,
      楼盘数: arrayByDay[key].length
    });
    houseData.push({
      month: key,
      房源数: houseNumber
    });
  });

  // 构建rank数据

  const buildRankData = buildData.map(item => ({
    _id: utils.getRandomId(),
    name: item.month,
    number: item['楼盘数']
  }));
  const houseRankData = houseData.map(item => ({
    _id: utils.getRandomId(),
    name: item.month,
    number: item['房源数']
  }));

  // 柱状图数据
  const areas = _.groupBy(
    appState.allData,
    (item: cdFang.IhouseData) => item.area
  );
  const chartHouseData: cdFang.IareaHouse[] = [];
  const chartBuildData: cdFang.IareaBuilder[] = [];
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
      <div className="home-content-houses">
        <Tabs type="card">
          <TabPane tab="房源数" key="1">
            <Row>
              <Col span={18}>
                <AreaGraph data={houseData} title="房源数" />
              </Col>
              <Col span={6}>
                <Rank data={houseRankData} title="月份" unit="套" />
              </Col>
            </Row>
            <AreaBar
              title="房源 / 区域(统计图)"
              data={chartHouseData}
              xAxis="区域"
              yAxis="房源"
              desc
            />
          </TabPane>
          <TabPane tab="楼盘数" key="2">
            <Row>
              <Col span={18}>
                <AreaGraph data={buildData} title="楼盘数" />
              </Col>
              <Col span={6}>
                <Rank data={buildRankData} title="月份" unit="个" />
              </Col>
            </Row>
            <AreaBar
              title="楼盘数 / 区域(统计图)"
              data={chartBuildData}
              xAxis="区域"
              yAxis="楼盘数"
              desc
            />
          </TabPane>
        </Tabs>
      </div>
      <div className="content-graph-table">
        <WholeTable />
      </div>
    </Content>
  );
}

export default Home;
