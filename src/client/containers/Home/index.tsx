import React, { useState } from 'react';
import _ from 'lodash';
import dayjs from 'dayjs';
import { Layout, Col, Row, Tabs, Tag, Timeline } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { RouteComponentProps } from 'react-router';

import utils from '../../utils';
import BasicAreaGraph from '../../components/BasicAreaGraph';
import WholeTable from '../../components/WholeTable';
import StatisticCard from '../../components/StatisticCard';
import Rank from '../../components/Rank';
import BasicColumnGraph from '../../components/BasicColumnGraph';
import GroupedColumnGraph from '../../components/GroupedColumnGraph';
import HouseDetail from '../../components/HouseDetail';
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

interface ImonthHousePrice {
  month: string;
  [constants.HOUSE_PRICE_MAX]: number;
  [constants.HOUSE_PRICE_MIN]: number;
}

const Home: React.FunctionComponent<RouteComponentProps> = () => {
  const { allData } = useContext(AppContext);
  const [desc, changeTimelineDesc] = useState(true);

  // 构建区域图需要的数据
  const arrayByMonth = _.groupBy(allData, (item) =>
    dayjs(item.beginTime).format('YYYY-MM')
  );
  const arrayByDay = _.groupBy(allData, (item) =>
    dayjs(item.beginTime).format('YYYY-MM-DD')
  );

  const houseData: ImonthHouse[] = [];
  const builderData: ImonthBuilder[] = [];
  const housePriceData: ImonthHousePrice[] = [];
  Object.keys(arrayByMonth)
    .sort()
    .forEach((key) => {
      const houseNumber = _.sumBy(arrayByMonth[key], 'number');
      builderData.push({
        month: key,
        [constants.BUILDER_NUMBER]: arrayByMonth[key].length,
      });
      houseData.push({
        month: key,
        [constants.HOUSE_NUMBER]: houseNumber,
      });

      const hasPriceHouses = arrayByMonth[key].filter((house) => house.price);
      if (hasPriceHouses.length > 0) {
        const housePriceMax = _.maxBy(hasPriceHouses, 'price')?.price || 0;
        const housePriceMin = _.minBy(hasPriceHouses, 'price')?.price || 0;
        housePriceData.push({
          month: key,
          [constants.HOUSE_PRICE_MAX]: housePriceMax,
          [constants.HOUSE_PRICE_MIN]: housePriceMin,
        });
      }
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
  const maxHousePriceRankData = housePriceData.map((item) => ({
    _id: utils.getRandomId(),
    name: `${item.month} 最高价`,
    number: item[constants.HOUSE_PRICE_MAX],
  }));
  const minHousePriceRankData = housePriceData.map((item) => ({
    _id: utils.getRandomId(),
    name: `${item.month} 最低价`,
    number: item[constants.HOUSE_PRICE_MAX],
  }));
  const housePriceRankData = maxHousePriceRankData.concat(
    minHousePriceRankData
  );

  // 柱状图数据
  const {
    chartHouseData,
    chartBuilderData,
    chartHousePriceData,
  } = utils.getBasicColumnGraphData(allData);

  return (
    <Content className="content">
      <div className="content-section">
        <CurrentHouse />
      </div>

      <div className="content-statistic-card">
        <StatisticCard />
      </div>
      <div className="home-content-houses">
        <Tabs>
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
            <hr />
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
            <hr />
            <BasicColumnGraph
              title="楼盘数 / 区域(统计图)"
              data={chartBuilderData}
              xAxis={constants.AREA}
              yAxis={constants.BUILDER_NUMBER}
              desc
            />
          </TabPane>
          <TabPane
            tab={
              <span>
                {constants.HOUSE_PRICE}
                <Tag style={{ marginLeft: '5px' }} color="processing">
                  new
                </Tag>
              </span>
            }
            key="3"
          >
            <Row>
              <Col span={18}>
                <BasicAreaGraph
                  data={housePriceData}
                  title={constants.HOUSE_PRICE}
                  fields={[
                    constants.HOUSE_PRICE_MAX,
                    constants.HOUSE_PRICE_MIN,
                  ]}
                />
              </Col>
              <Col span={6}>
                <Rank data={housePriceRankData} title="月份" unit="元" />
              </Col>
            </Row>
            <hr />
            <GroupedColumnGraph
              title="房价 / 区域(统计图)"
              data={chartHousePriceData}
              xAxis={constants.AREA}
              yAxis={constants.HOUSE_PRICE}
              desc
            />
          </TabPane>
        </Tabs>
      </div>
      <div className="content-section content-timeline">
        <div className="content-timeline-title">
          <span
            onClick={() => {
              changeTimelineDesc(!desc);
            }}
            aria-hidden="true"
          >
            时间轴
            {desc ? <ArrowDownOutlined /> : <ArrowUpOutlined />}
          </span>
        </div>
        <div className="content-timeline-content">
          <Timeline mode="alternate" reverse={desc}>
            {Object.keys(arrayByDay)
              .sort()
              .map((day) => (
                <Timeline.Item label={day}>
                  {arrayByDay[day].map((item) => (
                    <span className="content-timeline-item">
                      <HouseDetail name={item.name} />
                    </span>
                  ))}
                </Timeline.Item>
              ))}
          </Timeline>
        </div>
      </div>
      <div className="content-section">
        <WholeTable />
      </div>
    </Content>
  );
};

export default Home;
