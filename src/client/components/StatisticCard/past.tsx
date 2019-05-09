import * as React from 'react';
import { Card, Col, Row } from 'antd';
import * as _ from 'lodash';
import util from '../../utils';
import { AppContext } from '../../context/appContext';
import * as constants from '../../constants';

const { useContext } = React;

function StatisticCardPast() {
  const appState = useContext(AppContext);
  const { allData } = appState;
  const allInfo = util.getAllInfo(allData);

  // 年度房源
  const maxHouse = _.maxBy(allData, house => {
    return house.number;
  }) as cdFang.IhouseData;

  // 年度楼盘
  const dataByName = _.groupBy(allData, item => item.name);
  const maxBuilderName =
    _.maxBy(Object.keys(dataByName), item => {
      return dataByName[item].length;
    }) || 'Not Found Builder';
  const maxBuildLength = dataByName[maxBuilderName].length;
  const maxBuild = _.sumBy(dataByName[maxBuilderName], item => item.number);

  // 年度区域
  const dataByArea = _.groupBy(allData, item => item.area);
  const maxAreaName =
    _.maxBy(Object.keys(dataByArea), item => {
      return dataByArea[item].length;
    }) || 'Not Found Area';
  const maxAreaLength = dataByArea[maxAreaName].length;
  const maxArea = _.sumBy(dataByArea[maxAreaName], item => item.number);

  return (
    <div className="content-card">
      <Row gutter={16}>
        <Col span={6}>
          <Card title="年度房源" bordered={false} extra={maxHouse.name}>
            {`${constants.HOUSE_NUMBER}：${maxHouse.number}`}
            <br />
            {`${constants.AREA}：${maxHouse.area}`}
          </Card>
        </Col>
        <Col span={6}>
          <Card title="年度楼盘" bordered={false} extra={maxBuilderName}>
            {`${constants.SALE_TIMES}：${maxBuildLength}`}
            <br />
            {`${constants.HOUSE_NUMBER}：${maxBuild}`}
          </Card>
        </Col>
        <Col span={6}>
          <Card title="年度区域" bordered={false} extra={maxAreaName}>
            {`${constants.SALE_TIMES}：${maxAreaLength}`}
            <br />
            {`${constants.HOUSE_NUMBER}：${maxArea}`}
          </Card>
        </Col>
        <Col span={6}>
          <Card title="年度开盘" bordered={false}>
            {`${constants.BUILDER_NUMBER}：${allInfo.buildNumber}`}
            <br />
            {`${constants.HOUSE_NUMBER}：${allInfo.houseNumber}`}
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default StatisticCardPast;
