/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Chart, Geom, Axis, Tooltip } from 'bizcharts';
import RenderNoEmptyComponent from '../HOC/RenderNoEmptyComponent';
import { RenderLoadingComponent } from '../HOC/RenderLoadingComponent';

interface Iarea {
  区域: string;
  房源?: number;
  楼盘数?: number;
  [yAxis: string]: any;
}

export interface Iprops {
  data: Iarea[];
  title: string;
  xAxis: string;
  yAxis: string;
  desc?: boolean;
}

const BasicColumnGraph: React.FunctionComponent<Iprops> = ({
  data,
  title,
  xAxis,
  yAxis,
  desc,
}) => {
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
};

const BasicColumnGraphMemo = React.memo<Iprops>(
  RenderNoEmptyComponent(RenderLoadingComponent(BasicColumnGraph), ['data']),
  (): boolean => false
);

export default BasicColumnGraphMemo;
