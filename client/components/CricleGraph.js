import React from 'react';
import _ from 'lodash';
import moment from 'moment';
import { Chart, Geom, Axis, Tooltip, Coord, Label, Guide } from 'bizcharts';
import DataSet from '@antv/data-set';
import PropTypes from 'prop-types';
const { DataView } = DataSet;
const { Html } = Guide;

class CircleGraph extends React.Component {
	selectMonth(item) {
		this.props.changeMonth(item);
	}
	shouldComponentUpdate(nextProps) {
		if (nextProps.data.length != this.props.data.length) {
			return true;
		}
		if (nextProps.isChangeTab) {
			return true;
		}
		return false;
	}
	render() {
		var array = this.props.data;
		var arrayByMonth = _.groupBy(array, item => {
			return moment(item.beginTime)
				.startOf('month')
				.format('YYYY-MM');
		});
		var cricleObj = [];
		Object.keys(arrayByMonth).forEach(key => {
			var houseNumber = _.sumBy(arrayByMonth[key], 'number');
			cricleObj.push({
				item: moment(key).format('YYYY年MM月'),
				number: houseNumber,
				date: key
			});
		});

		const dv = new DataView();
		dv.source(cricleObj).transform({
			type: 'percent',
			field: 'number',
			dimension: 'item',
			as: 'percent'
		});
		const cols = {
			percent: {
				formatter: val => {
					val = (val * 100).toFixed(2) + '%';
					return val;
				}
			}
		};
		var houseNumber = _.sumBy(this.props.data, 'number');
		var guideHtml = `
    <div style="color:#8c8c8c;font-size:1em;text-align: center;width: 10em;">总计<br><span style="color:#262626;font-size:1.5em">${houseNumber}</span>套</div>
    `;
		return (
			<Chart
				height={400}
				data={dv}
				scale={cols}
				forceFit
				onClick={this.selectMonth.bind(this)}
			>
				<Coord type={'theta'} radius={0.75} innerRadius={0.6} />
				<Axis name="percent" />
				<Tooltip
					showTitle={false}
					itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
				/>
				<Guide>
					<Html
						position={['50%', '50%']}
						html={guideHtml}
						alignX="middle"
						alignY="middle"
					/>
				</Guide>
				<Geom
					select={true}
					type="intervalStack"
					position="percent"
					color="item"
					tooltip={[
						'item*percent',
						(item, percent) => {
							percent = (percent * 100).toFixed(2) + '%';
							return {
								name: item,
								value: percent
							};
						}
					]}
					style={{ lineWidth: 1, stroke: '#fff' }}
				>
					<Label
						content="percent"
						formatter={(val, item) => {
							return item.point.item + ': ' + val;
						}}
					/>
				</Geom>
			</Chart>
		);
	}
}

CircleGraph.propTypes = {
	data: PropTypes.array,
	changeMonth: PropTypes.func,
	isChangeTab: PropTypes.bool
};

export default CircleGraph;
