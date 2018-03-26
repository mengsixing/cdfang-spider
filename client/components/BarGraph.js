import React from 'react';
import DataSet from '@antv/data-set';
import moment from 'moment';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';

class BarGraph extends React.Component{

	shouldComponentUpdate(){
		return false;
	}

	render(){
		var array=this.props.data;
		var arrayByMonth= _.groupBy(array,item=>{
			return moment(item.beginTime).startOf('month').format('YYYY-MM');
		});
		var buildObj={name:'楼盘'};
		var houseObj={name:'房源'};
		var cricleObj=[];
		var fields=[];
		Object.keys(arrayByMonth).forEach((key)=>{
			var houseNumber=_.sumBy(arrayByMonth[key],'number');
			var buildNumber=arrayByMonth[key].length;
			buildObj[key]=buildNumber;
			houseObj[key]=houseNumber;
			cricleObj.push({
				item:key,
				number:houseNumber
			});
			fields.push(key);
		});
		fields=_.sortBy(fields, [function(o) { return moment(o); }]);
		const data = [
			buildObj,houseObj
			//{ name:'楼盘', 'Jan.': 18.9, 'Feb.': 28.8, 'Mar.' :39.3, 'Apr.': 81.4, 'May': 47, 'Jun.': 20.3, 'Jul.': 24, 'Aug.': 35.6 },
		];
		const ds = new DataSet();
		const dv = ds.createView().source(data);
		dv.transform({
			type: 'fold',
			fields: fields,//[ 'Jan.','Feb.','Mar.','Apr.','May','Jun.','Jul.','Aug.' ], // 展开字段集
			key: '月份', 
			value: '数量', 
		});
    
		return (
			<Chart height={400} forceFit data={dv}>
				<Axis name="月份" />
				<Axis name="数量" />
				<Legend />
				<Tooltip />
				<Geom type='interval' position="月份*数量" color={'name'} select={true} adjust={[{type: 'dodge',marginRatio: 1/32}]} />
			</Chart>
		);
	}
}

BarGraph.propTypes = {
	data: PropTypes.array
};

export default BarGraph;
