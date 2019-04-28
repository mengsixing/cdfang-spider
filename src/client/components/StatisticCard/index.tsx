import * as React from 'react';
import { Card, Col, Row } from 'antd';
import util from '../../utils';
import { AppContext } from '../../context/appContext';

const { useContext } = React;

function renderCard(info) {
  return (
    <div>
      <div className="content-card-text">
        <span>
                    楼盘数：
          {info.buildNumber}
        </span>
        <span
          style={{
            color:
                            info.increaseBuildNumber > 0 ? '#5eba00' : '#cd201f',
          }}
        >
          {info.increaseBuildNumberString}
        </span>
      </div>
      <div className="content-card-text">
        <span>
                    房源数：
          {info.houseNumber}
        </span>
        <span
          style={{
            color:
                            info.increaseHouseNumber > 0 ? '#5eba00' : '#cd201f',
          }}
        >
          {info.increaseHouseNumberString}
        </span>
      </div>
    </div>
  );
}

function StatisticCard() {
  const appState = useContext(AppContext);
  const { allData } = appState;
  const allInfo = util.getAllInfo(allData);
  const thisWeekInfo = util.getThisWeekInfo(allData);
  const thisMonthInfo = util.getThisMonthInfo(allData);
  const thisQuarterInfo = util.getThisQuarterInfo(allData);

  return (
    <div className="content-card">
      <Row gutter={16}>
        <Col span={6}>
          <Card
            title="本周开盘"
            bordered={false}
            extra={<span>相比上周</span>}
          >
            {renderCard(thisWeekInfo)}
          </Card>
        </Col>
        <Col span={6}>
          <Card
            title="本月开盘"
            bordered={false}
            extra={<span>相比上月</span>}
          >
            {renderCard(thisMonthInfo)}
          </Card>
        </Col>
        <Col span={6}>
          <Card
            title="本季度开盘"
            bordered={false}
            extra={<span>相比上季</span>}
          >
            {renderCard(thisQuarterInfo)}
          </Card>
        </Col>
        <Col span={6}>
          <Card title="总开盘" bordered={false}>
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
