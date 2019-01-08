import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import {
  Chart, Geom, Axis, Tooltip,
} from 'bizcharts';

class AreaBar extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const {
      appState: { allData: array },
    } = this.props;
    const areas = _.groupBy(array, item => item.area);
    let data = [];
    // 倒序排列
    Object.keys(areas).forEach((key) => {
      data.push({ 区域: key, 房源: _.sumBy(areas[key], 'number') });
    });
    data = data.sort((a, b) => b['房源'] - a['房源']);
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
  appState: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default inject('appState')(observer(AreaBar));
