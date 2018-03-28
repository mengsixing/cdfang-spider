import React from 'react';
import 'whatwg-fetch';
import PropTypes from 'prop-types';
import { Collapse, List,Col, Row,Icon } from 'antd';
const Panel = Collapse.Panel;

class CurrentHouse extends React.Component {

	render() {
		var allData=this.props.data;
		var currentHouses = allData.filter(item=>item.status!='报名结束').map(item=>{
			return (
				<div className="current-house-list"  key={item._id}>
					<Row> 
						<Col span={4}> <span className="notification-icon"><Icon type="notification" /></span> {item.area}</Col> 
						<Col span={8}>{item.name}</Col>
						<Col span={4}>{item.number}套</Col> 
						<Col span={8}>登记截止时间：{item.endTime} <a className="register-link" rel="nofollow me noopener noreferrer" target="_blank" href="http://171.221.172.13:8888/lottery/accept/projectList">登记</a></Col>
					</Row>
				</div>
			);
		});
		return (
			<div className="content-card">
				<Collapse defaultActiveKey={['1']}>
					<Panel header="正在登记" key="1">
						<List
							bordered
							dataSource={currentHouses}
							renderItem={item => (<List.Item>{item}</List.Item>)}
						/>
					</Panel>
				</Collapse>
			</div>
		);
	}
}

CurrentHouse.propTypes = {
	data: PropTypes.array
};

export default CurrentHouse;
