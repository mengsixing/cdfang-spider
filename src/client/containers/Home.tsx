import * as React from 'react';
import * as _ from 'lodash';
import { Layout, Col, Row } from 'antd';
import * as dayjs from 'dayjs';

import gql from 'graphql-tag';

import config from '../config';
import { AppContext } from '../context/appContext';

import AreaGraph from '../components/AreaGraph';
import StatisticCard from '../components/StatisticCard';

import Rank from '../components/Rank';
import './Home.less';
import Loading from '../components/Loading';

interface IallHouses {
  allHouses: cdFang.IhouseData[];
}

const { lazy, Suspense, useEffect, useContext } = React;
const CurrentHouse = lazy(() => import('../components/CurrentHouse'));

const { Content } = Layout;

function Home(props) {
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

  useEffect(() => {
    reloadData(props.year);
  }, []);

  // 构建区域图需要的数据
  const arrayByDay = _.groupBy(appState.allData, item => {
    return dayjs(item.beginTime).format('YYYY-MM');
  });

  console.warn(arrayByDay);

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
    _id: 'q123',
    name: item.month,
    number: item['楼盘数']
  }));
  const houseRankData = houseData.map(item => ({
    _id: 'q123',
    name: item.month,
    number: item['房源数']
  }));

  return (
    <Content className="content">
      <Suspense fallback={<Loading />}>
        <CurrentHouse />
      </Suspense>
      <StatisticCard />
      <div className="home-content-houses">
        <Row>
          <Col span={18}>
            <AreaGraph data={buildData} title="楼盘数" />
          </Col>
          <Col span={6}>
            <Rank data={buildRankData} title="月份" unit="个" />
          </Col>
        </Row>
        <Row>
          <Col span={18}>
            <AreaGraph data={houseData} title="房源数" />
          </Col>
          <Col span={6}>
            <Rank data={houseRankData} title="月份" unit="套" />
          </Col>
        </Row>
      </div>
    </Content>
  );
}

export default Home;
