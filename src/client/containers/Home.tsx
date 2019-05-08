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
import util from '../utils';

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
      [constants.HOUSE_NUMBER]: houseNumber
    });
  });

  // 构建排行数据
  const builderRankData = builderData.map(item => ({
    _id: utils.getRandomId(),
    name: item.month,
    number: item[constants.BUILDER_NUMBER]
  }));
  const houseRankData = houseData.map(item => ({
    _id: utils.getRandomId(),
    name: item.month,
    number: item[constants.HOUSE_NUMBER]
  }));

  // 柱状图数据
  const { chartHouseData, chartBuilderData } = util.getAreaBarData(
    appState.allData
  );

  return (
    <Content className="content">
      <Suspense fallback={<Loading />}>
        <CurrentHouse />
      </Suspense>
      <StatisticCard />
      <div className="home-content-houses">
        <Tabs type="card">
          <TabPane tab={constants.HOUSE_NUMBER} key="1">
            <Row>
              <Col span={18}>
                <AreaGraph data={houseData} title={constants.HOUSE_NUMBER} />
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
          <TabPane tab={constants.BUILDER_NUMBER} key="2">
            <Row>
              <Col span={18}>
                <AreaGraph
                  data={builderData}
                  title={constants.BUILDER_NUMBER}
                />
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
