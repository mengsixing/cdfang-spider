import React from 'react';
import { Chart, Geom, Axis, Tooltip } from 'bizcharts';
import dayjs from 'dayjs';
import _ from 'lodash';
import { HOUSE_NUMBER, BUILDER_NUMBER } from '../../constants';

interface Iprops {
  data: cdFang.IhouseData[];
}

function DoubleAxisGraph({ data }: Iprops) {
  const dataGroupByMonth = _.groupBy(data, item =>
    dayjs(item.beginTime).format('M月')
  );

  const chartData = Object.keys(dataGroupByMonth).map(key => {
    const houseNumber = _.sumBy(dataGroupByMonth[key], item => item.number);
    const builderBumber = dataGroupByMonth[key].length;
    return {
      date: key,
      houseNumber,
      builderBumber
    };
  });

  const scale = {
    builderBumber: {
      alias: BUILDER_NUMBER
    },
    houseNumber: {
      min: 0,
      alias: HOUSE_NUMBER
    }
  };
  return (
    <Chart height={400} scale={scale} forceFit data={chartData}>
      <Axis />
      <Tooltip />
      <Geom type="interval" position="date*houseNumber" color="#3182bd" />
      <Geom
        type="line"
        position="date*builderBumber"
        color="#fdae6b"
        size={3}
        shape="smooth"
      />
    </Chart>
  );
}

export default DoubleAxisGraph;
