import React, { useState, useContext, useEffect } from 'react';
import { Col, Row } from 'antd';
import dayjs from 'dayjs';
import _ from 'lodash';
import { AppContext } from '../../context/appContext';

import CricleGraph from '../CricleGraph';
import Rank from '../Rank';
import BarGraph from '../BarGraph';


function ChartPanel(props) {
  const appState = useContext(AppContext);
  const { panelIndex, data } = props;
  let initState = { isChangeTab: false };
  if (panelIndex !== appState.activityKey) {
    initState = {
      rank: data,
      rankTitle: '',
      isChangeTab: true,
      isOpen: false,
    };
  }

  const [state, setState] = useState(initState);

  useEffect(() => {
    setState({
      rank: props.data,
      rankTitle: '',
      isChangeTab: false,
      isOpen: false,
    });
  }, []);

  const changeMonth = (item) => {
    const { rankTitle, isOpen } = state;
    console.log(state);
    const { _origin } = item.data;
    if (rankTitle === _origin.item && isOpen) {
      setState({
        ...state,
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
        ...state,
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
        <CricleGraph data={data} changeMonth={changeMonth} isChangeTab={isChangeTab} />
      </Col>
      <Col span={6}>
        {rank ? <Rank data={rank} title={rankTitle} /> : ''}
      </Col>
    </Row>
  );
}

export default ChartPanel;
