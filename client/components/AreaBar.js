import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import util from '../util';
import { inject, observer } from 'mobx-react';
import { Chart, Geom, Axis, Tooltip } from 'bizcharts';

class AreaBar extends React.Component {
	shouldComponentUpdate() {
		return false;
	}

	render() {
		var array = this.props.appState.allData;
		var areas = _.groupBy(array, function(item) {
			return item.area;
		});
		var data = [];
		util.sortArea(Object.keys(areas)).forEach(key => {
			data.push({ 区域: key, 房源: _.sumBy(areas[key], 'number') });
		});
		return (
			<Chart height={400} data={data} forceFit>
				<Axis name="区域" />
				<Axis name="房源" />
				<Tooltip />
				<Geom type="interval" position="区域*房源" />
			</Chart>
		);
	}
}

AreaBar.propTypes = {
	appState: PropTypes.object
};

export default inject('appState')(observer(AreaBar));
