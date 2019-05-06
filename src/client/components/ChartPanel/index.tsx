import * as React from 'react';
import { Col, Row } from 'antd';
import * as dayjs from 'dayjs';
import * as _ from 'lodash';
import { AppContext } from '../../context/appContext';

import CricleGraph from '../CricleGraph';
import Rank from '../Rank';
import BarGraph from '../BarGraph';

const { useState, useContext } = React;

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

function ChartPanel(props: Iprops) {
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
  const [prevData, setPrevData] = useState(null);

  // 模拟 getDerivedStateFromProps https://reactjs.org/docs/hooks-faq.html#how-do-i-implement-getderivedstatefromprops
  if (data !== prevData) {
    setState(initState);
    setPrevData(data);
  }

  function changeMonth(origin, newState: Istate) {
    const { rankTitle, isOpen } = newState;

    if (rankTitle === origin.item && isOpen) {
      return {
        ...newState,
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
      ...newState,
      rank: newRank,
      rankTitle: selectMonthTitle,
      isChangeTab: false,
      isOpen: true
    };
  }

  const { isChangeTab, rank, rankTitle } = state;

  return (
    <Row>
      <Col span={9}>
        <BarGraph data={data} />
      </Col>
      <Col span={9}>
        <input
          id={`ChartPanel${appState.activityKey}`}
          type="hidden"
          value={JSON.stringify(state)}
        />
        <CricleGraph
          data={data}
          changeMonth={item => {
            // 由于 circle 组件使用 React.memo 再不渲染时，不能获取到最新的属性，这里使用 input 来转换
            const newState = JSON.parse(
              document
                .getElementById(`ChartPanel${appState.activityKey}`)
                .getAttribute('value')
            );
            setState(changeMonth(item, newState));
          }}
          isChangeTab={isChangeTab}
        />
      </Col>
      <Col span={6}>{rank ? <Rank data={rank} title={rankTitle} /> : ''}</Col>
    </Row>
  );
}

export default ChartPanel;
