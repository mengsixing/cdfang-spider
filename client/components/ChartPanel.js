import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'antd';
import moment from 'moment';

import CricleGraph from './CricleGraph';
import Rank from './Rank';
import BarGraph from './BarGraph';
import _ from 'lodash';




class ChartPanel extends React.Component{

	constructor(props){
		super();
		this.state={
			rank:props.data,
			rankTitle:''
		};
	}

	changeMonth(item){
		var selectMonth=item.data._origin.date;
		var selectMonthTitle=item.data._origin.item;
		var newRank= _.filter(this.props.data, function(item) { 
			return moment(item.beginTime)>moment(selectMonth) && moment(item.beginTime)<moment(selectMonth).endOf('month');
		});
		this.setState({
			rank:newRank,
			rankTitle:selectMonthTitle
		});
	}

	render(){
		return (
			<Row>
				<Col span={9}>
					<BarGraph data={this.props.data}></BarGraph>
				</Col>
				<Col span={9}>
					<CricleGraph data={this.props.data} changeMonth={this.changeMonth.bind(this)}  title={this.state.rankTitle}></CricleGraph>
				</Col>
				<Col span={6}>
					<Rank data={this.state.rank} title={this.state.rankTitle}></Rank>
				</Col>
			</Row>
		);
	}
}

ChartPanel.propTypes = {
	data: PropTypes.array
};

export default ChartPanel;
