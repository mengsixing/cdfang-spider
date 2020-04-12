import React from 'react';
import _ from 'lodash';
import dayjs from 'dayjs';
import { Layout, Col, Row, Tabs } from 'antd';
import { RouteComponentProps } from 'react-router';

import utils from '../../utils';
import BasicAreaGraph from '../../components/BasicAreaGraph';
import WholeTable from '../../components/WholeTable';
import StatisticCard from '../../components/StatisticCard';
import Rank from '../../components/Rank';
import BasicColumnGraph from '../../components/BasicColumnGraph';
import { AppContext } from '../../context/appContext';
import * as constants from '../../constants';
import './styles.less';

const { lazy, useContext } = React;
const { TabPane } = Tabs;
const { Content } = Layout;
const CurrentHouse = lazy(() => import('../../components/CurrentHouse'));

interface ImonthHouse {
  month: string;
  [constants.HOUSE_NUMBER]: number;
}

interface ImonthBuilder {
  month: string;
  [constants.BUILDER_NUMBER]: number;
}

const Home: React.FunctionComponent<RouteComponentProps> = () => {
  const { allData } = useContext(AppContext);

  // 构建区域图需要的数据
  const arrayByDay = _.groupBy(allData, (item) => {
    return dayjs(item.beginTime).format('YYYY-MM');
  });

  const houseData: ImonthHouse[] = [];
  const builderData: ImonthBuilder[] = [];
  Object.keys(arrayByDay)
    .sort()
    .forEach((key) => {
      const houseNumber = _.sumBy(arrayByDay[key], 'number');
      builderData.push({
        month: key,
        [constants.BUILDER_NUMBER]: arrayByDay[key].length,
      });
      houseData.push({
        month: key,
        [constants.HOUSE_NUMBER]: houseNumber,
      });
    });

  // 构建排行数据
  const builderRankData = builderData.map((item) => ({
    _id: utils.getRandomId(),
    name: item.month,
    number: item[constants.BUILDER_NUMBER],
  }));
  const houseRankData = houseData.map((item) => ({
    _id: utils.getRandomId(),
    name: item.month,
    number: item[constants.HOUSE_NUMBER],
  }));

  // 柱状图数据
  const { chartHouseData, chartBuilderData } = utils.getBasicColumnGraphData(
    allData
  );

  return (
    <Content className="content">
      <div className="content-section">
        <CurrentHouse />
      </div>

      <div className="content-statistic-card">
        <StatisticCard />
      </div>
      <div className="home-content-houses">
        <Tabs type="card">
          <TabPane tab={constants.HOUSE_NUMBER} key="1">
            <Row>
              <Col span={18}>
                <BasicAreaGraph
                  data={houseData}
                  title={constants.HOUSE_NUMBER}
                />
              </Col>
              <Col span={6}>
                <Rank data={houseRankData} title="月份" unit="套" />
              </Col>
            </Row>
            <BasicColumnGraph
              title="房源 / 区域(统计图)"
              data={chartHouseData}
              xAxis={constants.AREA}
              yAxis={constants.HOUSE_NUMBER}
              desc
            />
          </TabPane>
          <TabPane tab={constants.BUILDER_NUMBER} key="2">
            <Row>
              <Col span={18}>
                <BasicAreaGraph
                  data={builderData}
                  title={constants.BUILDER_NUMBER}
                />
              </Col>
              <Col span={6}>
                <Rank data={builderRankData} title="月份" unit="个" />
              </Col>
            </Row>
            <BasicColumnGraph
              title="楼盘数 / 区域(统计图)"
              data={chartBuilderData}
              xAxis={constants.AREA}
              yAxis={constants.BUILDER_NUMBER}
              desc
            />
          </TabPane>
        </Tabs>
      </div>
      <div className="content-section">
        <WholeTable />
      </div>
    </Content>
  );
};

export default Home;
