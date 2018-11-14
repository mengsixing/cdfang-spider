import React from 'react';
import 'whatwg-fetch';
import util from '../util';
import { Card, Col, Row } from 'antd';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

class StatisticCard extends React.Component {
	render() {
		var allData = this.props.appState.allData;
		var allInfo = util.getAllInfo(allData);
		var thisWeekInfo = util.getThisWeekInfo(allData);
		var thisMonthInfo = util.getThisMonthInfo(allData);
		var thisQuarterInfo = util.getThisQuarterInfo(allData);
		return (
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
		);
	}
}

StatisticCard.propTypes = {
	appState: PropTypes.object
};

export default inject('appState')(observer(StatisticCard));
