import React from 'react';
import { Chart, Geom, Axis, Tooltip } from 'bizcharts';
import DataSet from '@antv/data-set';

interface Ihouseprice {
  [K: string]: string;
}

export interface Iprops {
  data: Ihouseprice[];
  title: string;
  xAxis: string;
  yAxis: string;
}

const GroupedColumnGraph: React.FC<Iprops> = ({
  data,
  title,
  xAxis,
  yAxis,
}) => {
  const fields = Object.keys(data[0]).slice(1);
  const ds = new DataSet();
  const dv = ds.createView().source(data);
  dv.transform({
    type: 'fold',
    fields,
    key: xAxis,
    value: yAxis,
  });
  return (
    <div>
      <Chart height={400} data={dv} forceFit>
        <div className="chart-title">{title}</div>
        <Axis name={xAxis} />
        <Axis name={yAxis} />
        <Tooltip />
        <Geom
          type="interval"
          position={`${xAxis}*${yAxis}`}
          color="name"
          adjust={[
            {
              type: 'dodge',
              marginRatio: 1 / 32,
            },
          ]}
        />
      </Chart>
    </div>
  );
};

export default GroupedColumnGraph;
