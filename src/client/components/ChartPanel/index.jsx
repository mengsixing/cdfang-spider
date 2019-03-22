import React, { useState, useContext } from 'react';
import { Col, Row } from 'antd';
import dayjs from 'dayjs';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { AppContext } from '../../context/appContext';

import CricleGraph from '../CricleGraph';
import Rank from '../Rank';
import BarGraph from '../BarGraph';


function ChartPanel(props) {
  const appState = useContext(AppContext);
  const { panelIndex, data } = props;
  const initState = {
    rank: data,
    rankTitle: '',
    isChangeTab: false,
    isOpen: false,
  };

  if (panelIndex !== appState.activityKey) {
    initState.isChangeTab = true;
  }

  const [state, setState] = useState(initState);

  const changeMonth = (item, newState) => {
    const { rankTitle, isOpen } = newState;
    const { _origin } = item.data;

    if (rankTitle === _origin.item && isOpen) {
      setState({
        ...newState,
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
      setState({
        ...newState,
        rank: newRank,
        rankTitle: selectMonthTitle,
        isChangeTab: false,
        isOpen: true,
      });
    }
  };

  const { isChangeTab, rank, rankTitle } = state;

  return (
    <Row>
      <Col span={9}>
        <BarGraph data={data} />
      </Col>
      <Col span={9}>
        <CricleGraph
          data={data}
          changeMonth={(item) => {
            changeMonth(item, state);
          }}
          isChangeTab={isChangeTab}
        />
      </Col>
      <Col span={6}>
        {rank ? <Rank data={rank} title={rankTitle} /> : ''}
      </Col>
    </Row>
  );
}

ChartPanel.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
  panelIndex: PropTypes.number.isRequired,
};


export default ChartPanel;
