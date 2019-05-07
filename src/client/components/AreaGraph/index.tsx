import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';
import * as React from 'react';
import * as DataSet from '@antv/data-set';

interface Iarea {
  month: string;
  楼盘数?: number;
  房源数?: number;
}

interface Iprops {
  title: string;
  data: Iarea[];
}

function AreaGraph(props: Iprops) {
  const dv = new DataSet.View().source(props.data);
  dv.transform({
    type: 'fold',
    fields: [props.title],
    key: 'type',
    value: 'value'
  });
  const scale = {
    value: {
      alias: '数量'
    },
    month: {
      range: [0, 1]
    }
  };
  return (
    <Chart height={400} data={dv} scale={scale} forceFit>
      <div className="chart-title">{`${props.title}(按月)`}</div>
      <Tooltip crosshairs />
      <Axis />
      <Legend />
      <Geom type="area" position="month*value" color="type" shape="smooth" />
      <Geom type="line" position="month*value" color="type" shape="smooth" />
    </Chart>
  );
}

export default AreaGraph;
