/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { Chart, Geom, Axis, Tooltip } from 'bizcharts';
import RenderNoEmptyComponent from '../HOC/RenderNoEmptyComponent';
import './styles.less';

interface Iarea {
  区域: string;
  房源?: number;
  楼盘数?: number;
  [yAxis: string]: any;
}

interface Iprops {
  data: Iarea[];
  title: string;
  xAxis: string;
  yAxis: string;
  desc?: boolean;
}

function AreaBar({ data, title, xAxis, yAxis, desc }: Iprops) {
  let chartData: Iarea[] = [];
  if (desc) {
    chartData = data.sort((a, b): any => b[yAxis] - a[yAxis]);
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

const AreaBarMemo = React.memo<Iprops>(
  RenderNoEmptyComponent(AreaBar, ['data']),
  (): boolean => false
);

export default AreaBarMemo;
