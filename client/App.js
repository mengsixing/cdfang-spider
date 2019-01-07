import React from 'react';
import 'whatwg-fetch';
import _ from 'lodash';
import PropTypes from 'prop-types';
import util from './util';

import ChartPanel from './components/ChartPanel';
import Table from './components/WholeTable';
import StatisticCard from './components/StatisticCard';
import Notice from './components/Notice';
import CurrentHouse from './components/CurrentHouse';
import AreaBar from './components/AreaBar';
import config from './config/config';
import { Layout, Menu, Icon, Tabs } from 'antd';
import { inject, observer } from 'mobx-react';

import './App.less';
const { Header, Footer, Content } = Layout;
const TabPane = Tabs.TabPane;

class App extends React.Component {
	constructor() {
		super();
	}
	gotoGithub() {
		location.href = 'https://github.com/yhlben/cdfang-spider';
	}
	changeTab(activityKey) {
		this.props.appState.activityKey = Number.parseInt(activityKey);
	}
	reloadData() {
		fetch(config.serverDomain + '/getMongoData')
			.then(response => response.json())
			.then(json => {
				this.props.appState.allData.replace(json);
			});
	}
	componentDidMount() {
		this.reloadData();
	}
	render() {
		var allData = this.props.appState.allData;
		var areas = _.groupBy(allData, function(item) {
			return item.area;
		});
		var areasList = Object.keys(areas);
		var tabpanels = util.sortArea(areasList).map((item, index) => {
			return (
				<TabPane tab={item} key={index}>
					<ChartPanel
						data={areas[item]}
						panelIndex={index}
						activityKey={this.props.appState.activityKey}
					/>
				</TabPane>
			);
		});
		return (
			<div>
				<Layout>
					<Header style={{ backgroundColor: 'white' }}>
						<div className="header-item">
							<Notice reloadData={this.reloadData.bind(this)} />
							<Icon type="github" onClick={this.gotoGithub} />
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
							<Tabs defaultActiveKey="6" onChange={this.changeTab.bind(this)}>
								{tabpanels}
							</Tabs>
						</div>
						<div className="content-areabar">
							<div className="content-areabar-title">整体统计</div>
							{this.props.appState.allData.length > 0 ? <AreaBar /> : ''}
						</div>
						<div className="content-graph-table">
							{this.props.appState.allData.length > 0 ? (
								<Table areaList={areasList} />
							) : (
								''
							)}
						</div>
					</Content>
					<Footer style={{ textAlign: 'center' }}>
						Created by yhlben ©2018{' '}
					</Footer>
				</Layout>
			</div>
		);
	}
}

App.propTypes = {
	appState: PropTypes.object
};

export default inject('appState')(observer(App));
