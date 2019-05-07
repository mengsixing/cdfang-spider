import * as React from 'react';
import { Card, Col, Row } from 'antd';
import * as _ from 'lodash';
import util, { IhouseInfo } from '../../utils/index';
import { AppContext } from '../../context/appContext';

const { useContext } = React;

function StatisticCard() {
  const appState = useContext(AppContext);
  const { allData } = appState;
  const allInfo = util.getAllInfo(allData);

  // 年度房源
  const maxHouse = _.maxBy(allData, function(house) {
    return house.number;
  });

  // 年度楼盘
  const dataByName = _.groupBy(allData, item => item.name);
  const maxBuildName = _.maxBy(Object.keys(dataByName), function(item) {
    return dataByName[item].length;
  });
  const maxBuildLength = dataByName[maxBuildName].length;
  const maxBuild = _.sumBy(dataByName[maxBuildName], item => item.number);

  // 年度区域
  const dataByArea = _.groupBy(allData, item => item.area);
  const maxAreaName = _.maxBy(Object.keys(dataByArea), function(item) {
    return dataByArea[item].length;
  });
  const maxAreaLength = dataByArea[maxAreaName].length;
  const maxArea = _.sumBy(dataByArea[maxAreaName], item => item.number);

  return (
    <div className="content-card">
      <Row gutter={16}>
        <Col span={6}>
          <Card title="年度房源" bordered={false} extra={maxHouse.name}>
            房源数：
            {maxHouse.number}
            <br />
            区域：
            {maxHouse.area}
          </Card>
        </Col>
        <Col span={6}>
          <Card title="年度楼盘" bordered={false} extra={maxBuildName}>
            开盘数：
            {maxBuildLength}
            <br />
            房源数：
            {maxBuild}
          </Card>
        </Col>
        <Col span={6}>
          <Card title="年度区域" bordered={false} extra={maxAreaName}>
            开盘数：
            {maxAreaLength}
            <br />
            房源数：
            {maxArea}
          </Card>
        </Col>
        <Col span={6}>
          <Card title="年度开盘" bordered={false}>
            楼盘数：
            {allInfo.buildNumber}
            <br />
            房源数：
            {allInfo.houseNumber}
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default StatisticCard;
