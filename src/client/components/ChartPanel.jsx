import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'antd';
import dayjs from 'dayjs';

import _ from 'lodash';
import { inject, observer } from 'mobx-react';
import CricleGraph from './CricleGraph';
import Rank from './Rank';
import BarGraph from './BarGraph';

class ChartPanel extends React.Component {
  constructor(props) {
    super();
    this.state = {
      rank: props.data,
      rankTitle: '',
      isChangeTab: false,
      isOpen: false,
    };
    this.changeMonth = this.changeMonth.bind(this);
  }

  static getDerivedStateFromProps(props) {
    const { panelIndex, appState, data } = props;
    if (panelIndex !== appState.activityKey) {
      return {
        rank: data,
        rankTitle: '',
        isChangeTab: true,
        isOpen: false,
      };
    }
    return {};
  }

  changeMonth(item) {
    const { rankTitle, isOpen } = this.state;
    const { data } = this.props;
    const { _origin } = item.data;
    if (rankTitle === _origin.item && isOpen) {
      this.setState({
        rank: data,
        rankTitle: '',
        isChangeTab: false,
        isOpen: false,
      });
    } else {
      const selectMonth = _origin.date;
      const selectMonthTitle = _origin.item;
      const newRank = _.filter(
        data,
        dataItem => dayjs(dataItem.beginTime) > dayjs(selectMonth)
          && dayjs(dataItem.beginTime) < dayjs(selectMonth).endOf('month'),
      );
      this.setState({
        rank: newRank,
        rankTitle: selectMonthTitle,
        isChangeTab: false,
        isOpen: true,
      });
    }
  }

  render() {
    const { data } = this.props;
    const { isChangeTab, rank, rankTitle } = this.state;
    return (
      <Row>
        <Col span={9}>
          <BarGraph data={data} />
        </Col>
        <Col span={9}>
          <CricleGraph data={data} changeMonth={this.changeMonth} isChangeTab={isChangeTab} />
        </Col>
        <Col span={6}>
          <Rank data={rank} title={rankTitle} />
        </Col>
      </Row>
    );
  }
}

ChartPanel.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default inject('appState')(observer(ChartPanel));
