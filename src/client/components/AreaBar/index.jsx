import React from 'react';
import {
  Chart, Geom, Axis, Tooltip,
} from 'bizcharts';
import RenderNoEmptyComponent from '../HOC/RenderNoEmptyComponent';
import './styles.less';


function AreaBar(props) {
  const {
    data, title, xAxis, yAxis, desc,
  } = props;
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

export default React.memo(RenderNoEmptyComponent(AreaBar, ['data']), () => false);
