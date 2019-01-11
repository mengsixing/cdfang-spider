import React, { lazy, Suspense } from 'react';
import 'whatwg-fetch';
import _ from 'lodash';
import PropTypes from 'prop-types';
import {
  Layout, Menu, Icon, Tabs, BackTop,
} from 'antd';
import { inject, observer } from 'mobx-react';
import util from '../utils';

import ChartPanel from '../components/ChartPanel';
import Table from '../components/WholeTable';
import StatisticCard from '../components/StatisticCard';
import Notice from '../components/Notice';
import AreaBar from '../components/AreaBar';
import Loading from '../components/Loading';
import config from '../config';

import './App.less';

const CurrentHouse = lazy(() => import('../components/CurrentHouse'));

const { Header, Footer, Content } = Layout;
const { TabPane } = Tabs;

class App extends React.Component {
  static gotoGithub() {
    window.location.href = 'https://github.com/yhlben/cdfang-spider';
  }

  constructor() {
    super();
    this.reloadData = this.reloadData.bind(this);
    this.changeTab = this.changeTab.bind(this);
  }

  componentDidMount() {
    this.reloadData();
  }

  changeTab(activityKey) {
    const { appState } = this.props;
    appState.activityKey = Number.parseInt(activityKey, 10);
  }

  reloadData() {
    fetch(`${config.serverDomain}/getMongoData`)
      .then(response => response.json())
      .then((json) => {
        const { appState } = this.props;
        appState.allData.replace(json);
      });
  }

  render() {
    const {
      appState: { allData },
      appState,
    } = this.props;
    const areas = _.groupBy(allData, item => item.area);
    const areasList = Object.keys(areas);
    /* eslint-disable react/no-array-index-key */
    const tabpanels = util.sortArea(areasList).map((item, index) => (
      <TabPane tab={item} key={index}>
        <ChartPanel data={areas[item]} panelIndex={index} activityKey={appState.activityKey} />
      </TabPane>
    ));
    /* eslint-enable react/no-array-index-key */
    const chartHouseData = [];
    const chartBuildData = [];
    Object.keys(areas).forEach((key) => {
      chartHouseData.push({ 区域: key, 房源: _.sumBy(areas[key], 'number') });
      chartBuildData.push({ 区域: key, 楼盘数: areas[key].length });
    });

    return (
      <div>
        <BackTop />
        <Layout>
          <Header style={{ backgroundColor: 'white' }}>
            <div className="header-item">
              <Notice reloadData={this.reloadData} />
              <Icon type="github" onClick={App.gotoGithub} />
            </div>
            <Menu
              theme="light"
              mode="horizontal"
              defaultSelectedKeys={['1']}
              style={{ lineHeight: '64px' }}
            >
              <Menu.Item key="1">
                <Icon type="home" />
                首页
              </Menu.Item>
            </Menu>
          </Header>
          <Content className="content">
            <Suspense fallback={<Loading />}>
              <CurrentHouse />
            </Suspense>
            <StatisticCard />
            <div className="content-graph-bar">
              <Tabs defaultActiveKey="6" onChange={this.changeTab}>
                {tabpanels}
              </Tabs>
            </div>
            <div className="content-areabar">
              <div className="content-areabar-title">整体统计</div>
              <AreaBar title="房源数排序图" data={chartHouseData} xAxis="区域" yAxis="房源" desc />
              <AreaBar
                title="楼盘数排序图"
                data={chartBuildData}
                xAxis="区域"
                yAxis="楼盘数"
                desc
              />
            </div>
            <div className="content-graph-table">
              <Table areaList={areasList} />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Created by yhlben ©2018 </Footer>
        </Layout>
      </div>
    );
  }
}

App.propTypes = {
  appState: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default inject('appState')(observer(App));
