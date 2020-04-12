import React from 'react';
import _ from 'lodash';
import { Layout, Tabs } from 'antd';
import { RouteComponentProps } from 'react-router';

import util from '../../utils';
import ChartPanel from '../../components/ChartPanel';
import WholeTable from '../../components/WholeTable';
import StatisticCard from '../../components/StatisticCard';
import BasicColumnGraph from '../../components/BasicColumnGraph';
import { RenderLoadingJSX } from '../../components/HOC/RenderLoadingComponent';
import { AppContext } from '../../context/appContext';
import * as constants from '../../constants';

const { useContext } = React;
const { Content } = Layout;
const { TabPane } = Tabs;

const CurrentYear: React.FunctionComponent<RouteComponentProps> = () => {
  const { allData, activityKey, changeActivityKey, isLoading } = useContext(
    AppContext
  );

  const areasGroup = _.groupBy(allData, (item: cdFang.IhouseData) => item.area);
  const areasList = Object.keys(areasGroup);
  const tabpanels = util.sortArea(areasList).map((item: string) => (
    <TabPane tab={item} key={item}>
      <ChartPanel
        data={areasGroup[item]}
        panelKey={item}
        activityKey={activityKey}
      />
    </TabPane>
  ));
  // 柱状图数据
  const { chartHouseData, chartBuilderData } = util.getBasicColumnGraphData(
    allData
  );
  return (
    <Content className="content">
      <div className="content-statistic-card">
        <StatisticCard />
      </div>
      <div className="content-graph-bar">
        {RenderLoadingJSX(
          <Tabs defaultActiveKey={activityKey} onChange={changeActivityKey}>
            {tabpanels}
          </Tabs>,
          isLoading
        )}
      </div>
      <div className="content-basic-column">
        <div className="content-basic-column-title">整体统计</div>
        <BasicColumnGraph
          title="房源数排序图"
          data={chartHouseData}
          xAxis={constants.AREA}
          yAxis={constants.HOUSE_NUMBER}
          desc
        />
        <BasicColumnGraph
          title="楼盘数排序图"
          data={chartBuilderData}
          xAxis={constants.AREA}
          yAxis={constants.BUILDER_NUMBER}
          desc
        />
      </div>
      <div className="content-section">
        <WholeTable />
      </div>
    </Content>
  );
};

export default CurrentYear;
