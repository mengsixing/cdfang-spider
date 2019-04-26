import React, {
    lazy, Suspense, useEffect, useState,
} from 'react';
import _ from 'lodash';
import {
    Layout, Menu, Icon, Tabs, BackTop,
} from 'antd';
import gql from 'graphql-tag';
import util from '../utils';

import ChartPanel from '../components/ChartPanel';
import Table from '../components/WholeTable';
import StatisticCard from '../components/StatisticCard';
import Notice from '../components/Notice';
import AreaBar from '../components/AreaBar';
import Loading from '../components/Loading';
import config from '../config';
import { AppContext, globalData } from '../context/appContext';
import './App.less';

const CurrentHouse = lazy(() => import('../components/CurrentHouse'));
const { Header, Footer, Content } = Layout;
const { TabPane } = Tabs;

function App() {
    const { getGraphqlClient } = config;
    const [appState, changeInitData] = useState(globalData);

    function gotoGithub() {
        window.location.href = 'https://github.com/yhlben/cdfang-spider';
    }

    function reloadData() {
        getGraphqlClient()
            .query({
                query: gql`
      {
        allHouses {
          _id,
          area,
          name,
          number,
          beginTime,
          endTime,
          status
        }
      }`,
            })
            .then((result) => {
                changeInitData({ ...appState, allData: result.data.allHouses });
            });
    }

    function changeTab(activityKey) {
        appState.changeActivityKey(Number.parseInt(activityKey, 10));
    }

    useEffect(() => {
        reloadData();
    }, []);

    const { allData } = appState;
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
        <AppContext.Provider value={appState}>
            <BackTop />
            <Layout>
                <Header style={{ backgroundColor: 'white' }}>
                    <div className="header-item">
                        <Notice reloadData={reloadData} />
                        <Icon type="github" onClick={gotoGithub} />
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
                        <Tabs defaultActiveKey="6" onChange={changeTab}>
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

                <Footer style={{ textAlign: 'center' }}>Copyright 2018 - 2019 yhlben. All Rights Reserved</Footer>
            </Layout>
        </AppContext.Provider>
    );
}

export default App;
