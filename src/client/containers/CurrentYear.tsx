import * as React from 'react';
import * as _ from 'lodash';
import { Layout, Tabs } from 'antd';

import util from '../utils';
import ChartPanel from '../components/ChartPanel';
import WholeTable from '../components/WholeTable';
import StatisticCard from '../components/StatisticCard';
import AreaBar from '../components/AreaBar';
import { AppContext } from '../context/appContext';
import * as constants from '../constants';
import request from '../utils/request';

const { useEffect, useContext } = React;
const { Content } = Layout;
const { TabPane } = Tabs;

function CurrentYear(props) {
  const appState = useContext(AppContext);

  const changeTab = (activityKey: string): void => {
    appState.changeActivityKey(activityKey);
  };

  useEffect(() => {
    const year = constants.tabKeyRouterMap[props.location.pathname];
    request(year, allHouses => {
      appState.changeData(allHouses);
    });
  }, []);

  const { allData } = appState;
  const areas = _.groupBy(allData, (item: cdFang.IhouseData) => item.area);
  const areasList = Object.keys(areas);
  const tabpanels = util
    .sortArea(areasList)
    .map((item: string, index: number) => (
      <TabPane tab={item} key={item}>
        <ChartPanel
          data={areas[item]}
          panelKey={item}
          activityKey={appState.activityKey}
        />
      </TabPane>
    ));
  const chartHouseData: cdFang.IareaHouse[] = [];
  const chartBuildData: cdFang.IareaBuilder[] = [];
  Object.keys(areas).forEach(key => {
    chartHouseData.push({ 区域: key, 房源: _.sumBy(areas[key], 'number') });
    chartBuildData.push({ 区域: key, 楼盘数: areas[key].length });
  });

  return (
    <Content className="content">
      <StatisticCard />
      <div className="content-graph-bar">
        <Tabs defaultActiveKey={appState.activityKey} onChange={changeTab}>
          {tabpanels}
        </Tabs>
      </div>
      <div className="content-areabar">
        <div className="content-areabar-title">整体统计</div>
        <AreaBar
          title="房源数排序图"
          data={chartHouseData}
          xAxis="区域"
          yAxis="房源"
          desc
        />
        <AreaBar
          title="楼盘数排序图"
          data={chartBuildData}
          xAxis="区域"
          yAxis="楼盘数"
          desc
        />
      </div>
      <div className="content-graph-table">
        <WholeTable />
      </div>
    </Content>
  );
}

export default CurrentYear;
