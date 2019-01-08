import React from 'react';
import 'whatwg-fetch';
import _ from 'lodash';
import PropTypes from 'prop-types';
import {
  Layout, Menu, Icon, Tabs,
} from 'antd';
import { inject, observer } from 'mobx-react';
import util from './util';

import ChartPanel from './components/ChartPanel';
import Table from './components/WholeTable';
import StatisticCard from './components/StatisticCard';
import Notice from './components/Notice';
import CurrentHouse from './components/CurrentHouse';
import AreaBar from './components/AreaBar';
import config from './config/config';

import './App.less';

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
    return (
      <div>
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
            <CurrentHouse />
            <StatisticCard />
            <div className="content-graph-bar">
              <Tabs defaultActiveKey="6" onChange={this.changeTab}>
                {tabpanels}
              </Tabs>
            </div>
            <div className="content-areabar">
              <div className="content-areabar-title">整体统计</div>
              {allData.length > 0 ? <AreaBar /> : ''}
            </div>
            <div className="content-graph-table">
              {allData.length > 0 ? <Table areaList={areasList} /> : ''}
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
