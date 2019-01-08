import React from 'react';
import 'whatwg-fetch';
import { Card, Col, Row } from 'antd';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import util from '../util';

class StatisticCard extends React.Component {
  static getDerivedStateFromProps(props) {
    const { allData } = props.appState;
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

  renderCard(info) {
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
              {this.renderCard(state.thisWeekInfo)}
            </Card>
          </Col>
          <Col span={6}>
            <Card title="本月开盘" bordered={false} extra={<span>相比上月</span>}>
              {this.renderCard(state.thisMonthInfo)}
            </Card>
          </Col>
          <Col span={6}>
            <Card title="本季度开盘" bordered={false} extra={<span>相比上季</span>}>
              {this.renderCard(state.thisQuarterInfo)}
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

StatisticCard.propTypes = {
  appState: PropTypes.object,
};

export default inject('appState')(observer(StatisticCard));
