import React from 'react'
import 'whatwg-fetch'
import _ from 'lodash'

import Chart from './chart'
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
			allData: [],
			allData2:[]
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
		var totalNumber=_.sumBy(this.state.allData, 'number');
		
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
									<Card title="本周开盘" bordered={false}>Card content</Card>
								</Col>
								<Col span={6}>
									<Card title="本月开盘" bordered={false}>Card content</Card>
								</Col>
								<Col span={6}>
									<Card title="本季度开盘" bordered={false}>Card content</Card>
								</Col>
								<Col span={6}>
									<Card title="总开盘" bordered={false}>{totalNumber}</Card>
								</Col>
							</Row>
						</div>
						<div className="content-graph-bar">
							<Tabs defaultActiveKey="1">
								<TabPane tab="Tab 1" key="1">
									<Chart></Chart>
								</TabPane>
								<TabPane tab="Tab 2" key="2">
									<Chart></Chart>
								</TabPane>
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
