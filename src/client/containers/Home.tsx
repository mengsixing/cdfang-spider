import * as React from 'react';
import * as _ from 'lodash';
import * as dayjs from 'dayjs';
import { Layout, Col, Row, Tabs } from 'antd';

import utils from '../utils';
import AreaGraph from '../components/AreaGraph';
import WholeTable from '../components/WholeTable';
import StatisticCard from '../components/StatisticCard';
import Rank from '../components/Rank';
import Loading from '../components/Loading';
import AreaBar from '../components/AreaBar';
import { AppContext } from '../context/appContext';
import * as constants from '../constants';
import request from '../utils/request';
import './Home.less';

const { lazy, Suspense, useEffect, useContext } = React;
const { TabPane } = Tabs;
const { Content } = Layout;
const CurrentHouse = lazy(() => import('../components/CurrentHouse'));

function Home(props) {
  const appState = useContext(AppContext);

  useEffect(() => {
    const year = constants.tabKeyRouterMap[props.location.pathname];
    request(year, allHouses => {
      appState.changeData(allHouses);
    });
  }, []);

  // 构建区域图需要的数据
  const arrayByDay = _.groupBy(appState.allData, item => {
    return dayjs(item.beginTime).format('YYYY-MM');
  });

  const houseData = [];
  const builderData = [];
  Object.keys(arrayByDay).forEach(key => {
    const houseNumber = _.sumBy(arrayByDay[key], 'number');
    builderData.push({
      month: key,
      楼盘数: arrayByDay[key].length
    });
    houseData.push({
      month: key,
      房源数: houseNumber
    });
  });

  // 构建排行数据
  const builderRankData = builderData.map(item => ({
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
  const chartBuilderData: cdFang.IareaBuilder[] = [];
  Object.keys(areas).forEach(key => {
    chartHouseData.push({ 区域: key, 房源: _.sumBy(areas[key], 'number') });
    chartBuilderData.push({ 区域: key, 楼盘数: areas[key].length });
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
                <AreaGraph data={builderData} title="楼盘数" />
              </Col>
              <Col span={6}>
                <Rank data={builderRankData} title="月份" unit="个" />
              </Col>
            </Row>
            <AreaBar
              title="楼盘数 / 区域(统计图)"
              data={chartBuilderData}
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
