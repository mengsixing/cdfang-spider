import React from 'react';
import 'whatwg-fetch';
import _ from 'lodash';
import moment from 'moment';
import util from './util';

import BarGraph from './chart';
import Table from './table';
import { Layout,Menu } from 'antd';

import './App.less';
const { Header, Footer, Content } = Layout;

import { Card, Col, Row } from 'antd';
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

var serverDomain='http://localhost:3333';

if(process.env.NODE_ENV=='production'){
	serverDomain='http://yinhengli.com:3333';
}



class App extends React.Component {
	constructor(){
		super();
		var _this=this;
		this.state={
			allData: []
		};
		fetch(serverDomain+'/getMongoData').then((response)=>response.json()).then(json=>{
			_this.setState({
				allData:json
			});
		});
	}  
	
	render() {
		var allData=this.state.allData;
		var allInfo=util.getAllInfo(allData);
		var thisWeekInfo= util.getThisWeekInfo(allData);
		var thisMonthInfo= util.getThisMonthInfo(allData);
		var thisQuarterInfo= util.getThisQuarterInfo(allData);

		var areas=_.groupBy(allData,function(item){return item.area; } );
		var areasList=Object.keys(areas);
		var tabpanels=util.sortArea(areasList).map((item,index)=>{
			return (
				<TabPane tab={item} key={index}>
					<BarGraph data={areas[item]}></BarGraph>
				</TabPane>
			);
		});
		window.moment=moment;
		return (
			<div>
				<Layout>
					<Header style={{backgroundColor:'white'}}>
						<div className="logo" />
						<Menu
							theme="light"
							mode="horizontal"
							defaultSelectedKeys={['1']}
							style={{ lineHeight: '64px' }}
						>
							<Menu.Item key="1">首页</Menu.Item>
						</Menu>
					</Header>
					<Content className="content">
						<div className="content-card">
							<Row gutter={16}>
								<Col span={6}>
									<Card title="本周开盘" bordered={false}>
									楼盘数： {thisWeekInfo.buildNumber} <br />
									房源数： {thisWeekInfo.houseNumber}
									</Card>
								</Col>
								<Col span={6}>
									<Card title="本月开盘" bordered={false}>
									楼盘数： {thisMonthInfo.buildNumber} <br />
									房源数： {thisMonthInfo.houseNumber}
									</Card>
								</Col>
								<Col span={6}>
									<Card title="本季度开盘" bordered={false}>
									楼盘数： {thisQuarterInfo.buildNumber} <br />
									房源数： {thisQuarterInfo.houseNumber}
									</Card>
								</Col>
								<Col span={6}>
									<Card title="总开盘" bordered={false}>
									楼盘数： {allInfo.buildNumber} <br />
									房源数： {allInfo.houseNumber}
									</Card>
								</Col>
							</Row>
						</div>
						<div className="content-graph-bar">
							<Tabs defaultActiveKey="5">
								{tabpanels}
							</Tabs>
						</div>
						<div className="content-graph-table">
							{
								this.state.allData.length>0?<Table data={this.state.allData} areaList={areasList}></Table>:''
							}
						</div>
					</Content>
					<Footer style={{ textAlign: 'center' }}>Created by yhlben ©2018 </Footer>
				</Layout>
			</div>
		);
	}
}

export default App;
