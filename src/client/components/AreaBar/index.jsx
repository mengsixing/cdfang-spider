import React from 'react';
import {
  Chart, Geom, Axis, Tooltip,
} from 'bizcharts';
import PropTypes from 'prop-types';
import RenderNoEmptyComponent from '../HOC/RenderNoEmptyComponent';
import './styles.less';


function AreaBar({
  data, title, xAxis, yAxis, desc,
}) {
  let chartData = [];
  if (desc) {
    chartData = data.sort((a, b) => b[yAxis] - a[yAxis]);
  }
  return (
    <Chart height={400} data={chartData} forceFit>
      <div className="chart-title">{title}</div>
      <Axis name={xAxis} />
      <Axis name={yAxis} />
      <Tooltip />
      <Geom type="interval" position={`${xAxis}*${yAxis}`} />
    </Chart>
  );
}

AreaBar.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
  title: PropTypes.string.isRequired,
  xAxis: PropTypes.string.isRequired,
  yAxis: PropTypes.string.isRequired,
  desc: PropTypes.bool.isRequired,
};

export default React.memo(RenderNoEmptyComponent(AreaBar, ['data']), () => false);
