import React from 'react';
import 'whatwg-fetch';
import { Card, Col, Row } from 'antd';
import { inject, observer } from 'mobx-react';
import util from '../../utils';

class StatisticCard extends React.Component {
  static getDerivedStateFromProps(props) {
    const {
      appState: { allData },
    } = props;
    const allInfo = util.getAllInfo(allData);
    const thisWeekInfo = util.getThisWeekInfo(allData);
    const thisMonthInfo = util.getThisMonthInfo(allData);
    const thisQuarterInfo = util.getThisQuarterInfo(allData);
    return {
      allInfo,
      thisWeekInfo,
      thisMonthInfo,
      thisQuarterInfo,
    };
  }

  static renderCard(info) {
    return (
      <>
        <div className="content-card-text">
          <span>
            楼盘数：
            {info.buildNumber}
          </span>
          <span style={{ color: info.increaseBuildNumber > 0 ? '#5eba00' : '#cd201f' }}>
            {info.increaseBuildNumberString}
          </span>
        </div>
        <div className="content-card-text">
          <span>
            房源数：
            {info.houseNumber}
          </span>
          <span style={{ color: info.increaseHouseNumber > 0 ? '#5eba00' : '#cd201f' }}>
            {info.increaseHouseNumberString}
          </span>
        </div>
      </>
    );
  }

  render() {
    const { state } = this;
    return (
      <div className="content-card">
        <Row gutter={16}>
          <Col span={6}>
            <Card title="本周开盘" bordered={false} extra={<span>相比上周</span>}>
              {StatisticCard.renderCard(state.thisWeekInfo)}
            </Card>
          </Col>
          <Col span={6}>
            <Card title="本月开盘" bordered={false} extra={<span>相比上月</span>}>
              {StatisticCard.renderCard(state.thisMonthInfo)}
            </Card>
          </Col>
          <Col span={6}>
            <Card title="本季度开盘" bordered={false} extra={<span>相比上季</span>}>
              {StatisticCard.renderCard(state.thisQuarterInfo)}
            </Card>
          </Col>
          <Col span={6}>
            <Card title="总开盘" bordered={false}>
              楼盘数：
              {' '}
              {state.allInfo.buildNumber}
              {' '}
              <br />
              房源数：
              {' '}
              {state.allInfo.houseNumber}
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default inject('appState')(observer(StatisticCard));
