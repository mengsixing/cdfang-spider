import * as React from 'react';
import { Col, Row } from 'antd';
import * as dayjs from 'dayjs';
import * as _ from 'lodash';

import { AppContext } from '../../context/appContext';
import CricleGraph from '../CricleGraph';
import Rank from '../Rank';
import DoubleAxisGraph from '../DoubleAxisGraph';
import { RenderLoadingComponent } from '../HOC/RenderLoadingComponent';

const { useState, useContext } = React;
let currentState: Istate;

export interface Iprops {
  data: cdFang.IhouseData[];
  panelKey: string;
  activityKey: string;
}

interface Istate {
  isChangeTab: boolean;
  isOpen: boolean;
  rank: cdFang.IhouseData[];
  rankTitle: string;
}

const ChartPanel: React.FunctionComponent<Iprops> = props => {
  const appState = useContext(AppContext);
  const { panelKey, data } = props;
  const initState = {
    rank: data,
    rankTitle: '',
    isChangeTab: false,
    isOpen: false
  };

  if (panelKey !== appState.activityKey) {
    initState.isChangeTab = true;
  }

  // 只会执行一次
  const [state, setState] = useState(initState);
  const [prevData, setPrevData] = useState();

  // 模拟 getDerivedStateFromProps https://reactjs.org/docs/hooks-faq.html#how-do-i-implement-getderivedstatefromprops
  if (data !== prevData) {
    setState(initState);
    setPrevData(data);
  }

  function changeMonth(origin: cdFang.IcircleItem) {
    const { rankTitle, isOpen } = currentState;

    if (rankTitle === origin.item && isOpen) {
      return {
        ...currentState,
        rank: data,
        rankTitle: '',
        isChangeTab: false,
        isOpen: false
      };
    }
    const selectMonth = origin.date;
    const selectMonthTitle = origin.item;
    const newRank = _.filter(
      data,
      dataItem =>
        dayjs(dataItem.beginTime) > dayjs(selectMonth) &&
        dayjs(dataItem.beginTime) < dayjs(selectMonth).endOf('month')
    );
    return {
      ...currentState,
      rank: newRank,
      rankTitle: selectMonthTitle,
      isChangeTab: false,
      isOpen: true
    };
  }

  const { isChangeTab, rank, rankTitle } = state;

  currentState = state;

  return (
    <Row>
      <Col span={9}>
        <DoubleAxisGraph data={data} />
      </Col>
      <Col span={9}>
        <CricleGraph
          data={data}
          changeMonth={item => {
            // 由于 circle 组件使用 React.memo 在不渲染时，不能获取到最新的属性，这里使用局部变量来获取
            setState(changeMonth(item));
          }}
          isChangeTab={isChangeTab}
        />
      </Col>
      <Col span={6}>
        {rank ? <Rank data={rank} title={rankTitle} unit="套" isLink /> : ''}
      </Col>
    </Row>
  );
};

export default RenderLoadingComponent(ChartPanel);
