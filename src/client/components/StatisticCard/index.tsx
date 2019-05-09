import * as React from 'react';
import { Card, Col, Row } from 'antd';
import util, { IhouseInfo } from '../../utils/index';
import { AppContext } from '../../context/appContext';
import * as constants from '../../constants';

const { useContext } = React;

function StatisticCard() {
  const appState = useContext(AppContext);
  const { allData } = appState;
  const allInfo = util.getAllInfo(allData);
  const thisWeekInfo = util.getThisWeekInfo(allData);
  const thisMonthInfo = util.getThisMonthInfo(allData);
  const thisQuarterInfo = util.getThisQuarterInfo(allData);

  const renderCard = (info: IhouseInfo) => {
    return (
      <div>
        <div className="content-card-text">
          <span>{`${constants.BUILDER_NUMBER}：${info.buildNumber}`}</span>
          <span
            style={{
              color: info.increaseBuildNumber ? '#5eba00' : '#cd201f'
            }}
          >
            {info.increaseBuildNumberString}
          </span>
        </div>
        <div className="content-card-text">
          <span>{`${constants.HOUSE_NUMBER}：${info.houseNumber}`}</span>
          <span
            style={{
              color: info.increaseHouseNumber ? '#5eba00' : '#cd201f'
            }}
          >
            {info.increaseHouseNumberString}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="content-card">
      <Row gutter={16}>
        <Col span={6}>
          <Card title="本周开盘" bordered={false} extra="相比上周">
            {renderCard(thisWeekInfo)}
          </Card>
        </Col>
        <Col span={6}>
          <Card title="本月开盘" bordered={false} extra="相比上月">
            {renderCard(thisMonthInfo)}
          </Card>
        </Col>
        <Col span={6}>
          <Card title="本季度开盘" bordered={false} extra="相比上季">
            {renderCard(thisQuarterInfo)}
          </Card>
        </Col>
        <Col span={6}>
          <Card title="总开盘" bordered={false}>
            {`${constants.BUILDER_NUMBER}：${allInfo.buildNumber}`}
            <br />
            {`${constants.HOUSE_NUMBER}：${allInfo.houseNumber}`}
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default StatisticCard;
