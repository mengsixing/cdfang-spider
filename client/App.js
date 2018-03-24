import React from 'react'
import 'whatwg-fetch'
import _ from 'lodash'
import moment from 'moment'
import util from './util'

import BarGraph from './chart'
import Table from './table'
import { Layout,Menu } from 'antd';

import './App.less'
const { Header, Footer, Content } = Layout;

import { Card, Col, Row } from 'antd';
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;





class App extends React.Component {
	constructor(props){
		super();
		var _this=this;
		this.state={
			allData: []
		}
		fetch('http://localhost:3333/getMongoData').then((response)=>response.json()).then(json=>{
			_this.setState({
				allData:json
			});
		})
	}  
	
	componentDidMount(){
		console.log('mountd');
		var _this=this;
	}
	render() {
		var allData=this.state.allData;
		var totalNumber=_.sumBy(allData, 'number');
		var allInfo=util.getAllInfo(allData);
		var thisWeekInfo= util.getThisWeekInfo(allData);
		var thisMonthInfo= util.getThisMonthInfo(allData);
		var thisQuarterInfo= util.getThisQuarterInfo(allData);
		var areas=_.groupBy(allData,function(item){return item.area } );
		var tabpanels=util.sortArea(Object.keys(areas)).map((item,index)=>{
			return (
				<TabPane tab={item} key={index}>
					<BarGraph data={areas[item]}></BarGraph>
				</TabPane>
			)
		})
		window.moment=moment;
		return (
			<div>
				<Layout>
					<Header style={{backgroundColor:'white'}}>
						<div className="logo" />
						<Menu
							theme="light"
							mode="horizontal"
							defaultSelectedKeys={['2']}
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
							<Tabs defaultActiveKey="1">
								{tabpanels}
							</Tabs>
						</div>
						<div className="content-graph-table">
							<Table data={this.state.allData}></Table>
						</div>
					</Content>
					<Footer style={{ textAlign: 'center' }}>Created by yhlben ©2018 </Footer>
				</Layout>
			</div>
		)
	}
}

export default App;
