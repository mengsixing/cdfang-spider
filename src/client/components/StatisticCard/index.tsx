import React from 'react';
import { Card, Col, Row } from 'antd';
import util, { IhouseInfo } from '../../utils/index';
import { AppContext } from '../../context/appContext';
import * as constants from '../../constants';
import { RenderLoadingJSX } from '../HOC/RenderLoadingComponent';
import './styles.less';

const { useContext } = React;

const StatisticCard: React.FunctionComponent = () => {
  const appState = useContext(AppContext);
  const { allData, isLoading } = appState;
  const allInfo = util.getAllInfo(allData);
  const thisWeekInfo = util.getThisWeekInfo(allData);
  const thisMonthInfo = util.getThisMonthInfo(allData);
  const thisQuarterInfo = util.getThisQuarterInfo(allData);

  const renderCard = (info: IhouseInfo) => {
    return (
      <div>
        <div className="statistic-card-text">
          <span>{`${constants.BUILDER_NUMBER}：${info.buildNumber}`}</span>
          <span
            style={{
              color: info.increaseBuildNumber
                ? constants.RISE_COLOR
                : constants.DECLINE_COLOR,
            }}
          >
            {info.increaseBuildNumberString}
          </span>
        </div>
        <div className="statistic-card-text">
          <span>{`${constants.HOUSE_NUMBER}：${info.houseNumber}`}</span>
          <span
            style={{
              color: info.increaseHouseNumber
                ? constants.RISE_COLOR
                : constants.DECLINE_COLOR,
            }}
          >
            {info.increaseHouseNumberString}
          </span>
        </div>
      </div>
    );
  };

  return (
    <Row gutter={16}>
      <Col span={6}>
        <Card title="本周开盘" bordered={false} extra="相比上周">
          {RenderLoadingJSX(renderCard(thisWeekInfo), isLoading)}
        </Card>
      </Col>
      <Col span={6}>
        <Card title="本月开盘" bordered={false} extra="相比上月">
          {RenderLoadingJSX(renderCard(thisMonthInfo), isLoading)}
        </Card>
      </Col>
      <Col span={6}>
        <Card title="本季度开盘" bordered={false} extra="相比上季">
          {RenderLoadingJSX(renderCard(thisQuarterInfo), isLoading)}
        </Card>
      </Col>
      <Col span={6}>
        <Card title="总开盘" bordered={false}>
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

export default StatisticCard;
