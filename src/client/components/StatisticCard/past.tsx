import React from 'react';
import { Card, Col, Row } from 'antd';
import _ from 'lodash';
import util from '../../utils';
import { AppContext } from '../../context/appContext';
import * as constants from '../../constants';
import { RenderLoadingJSX } from '../HOC/RenderLoadingComponent';

const { useContext } = React;

const StatisticCardPast: React.FunctionComponent = () => {
  const appState = useContext(AppContext);
  const { allData, isLoading } = appState;
  const allInfo = util.getAllInfo(allData);

  // 年度房源
  const maxHouse = _.maxBy(allData, (house) => {
    return house.number;
  }) as cdFang.IhouseData;

  // 年度楼盘
  const dataByName = _.groupBy(allData, (item) => item.name);
  const maxBuilderName =
    _.maxBy(Object.keys(dataByName), (item) => {
      return dataByName[item].length;
    }) || '';

  let maxBuildLength = 0;
  let maxBuild = 0;
  if (dataByName[maxBuilderName]) {
    maxBuildLength = dataByName[maxBuilderName].length;
    maxBuild = _.sumBy(dataByName[maxBuilderName], (item) => item.number);
  }

  // 年度区域
  const dataByArea = _.groupBy(allData, (item) => item.area);
  const maxAreaName =
    _.maxBy(Object.keys(dataByArea), (item) => {
      return dataByArea[item].length;
    }) || '';
  let maxAreaLength = 0;
  let maxArea = 0;
  if (dataByArea[maxAreaName]) {
    maxAreaLength = dataByArea[maxAreaName].length;
    maxArea = _.sumBy(dataByArea[maxAreaName], (item) => item.number);
  }

  return (
    <Row gutter={16}>
      <Col span={6}>
        <Card
          title="年度房源"
          bordered={false}
          extra={maxHouse && maxHouse.name}
        >
          {RenderLoadingJSX(
            <div>
              {`${constants.HOUSE_NUMBER}：${
                (maxHouse && maxHouse.number) || 0
              }`}
              <br />
              {`${constants.AREA}：${(maxHouse && maxHouse.area) || '暂无'}`}
            </div>,
            isLoading
          )}
        </Card>
      </Col>
      <Col span={6}>
        <Card title="年度楼盘" bordered={false} extra={maxBuilderName}>
          {RenderLoadingJSX(
            <div>
              {`${constants.SALE_TIMES}：${maxBuildLength}`}
              <br />
              {`${constants.HOUSE_NUMBER}：${maxBuild}`}
            </div>,
            isLoading
          )}
        </Card>
      </Col>
      <Col span={6}>
        <Card title="年度区域" bordered={false} extra={maxAreaName}>
          {RenderLoadingJSX(
            <div>
              {`${constants.SALE_TIMES}：${maxAreaLength}`}
              <br />
              {`${constants.HOUSE_NUMBER}：${maxArea}`}
            </div>,
            isLoading
          )}
        </Card>
      </Col>
      <Col span={6}>
        <Card title="年度开盘" bordered={false}>
          {RenderLoadingJSX(
            <div>
              {`${constants.BUILDER_NUMBER}：${allInfo.buildNumber}`}
              <br />
              {`${constants.HOUSE_NUMBER}：${allInfo.houseNumber}`}
            </div>,
            isLoading
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default StatisticCardPast;
