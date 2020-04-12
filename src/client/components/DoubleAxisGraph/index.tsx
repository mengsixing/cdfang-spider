import React from 'react';
import { Chart, Geom, Axis, Tooltip } from 'bizcharts';
import dayjs from 'dayjs';
import _ from 'lodash';
import { HOUSE_NUMBER, BUILDER_NUMBER, RISE_COLOR } from '../../constants';

// 导出给 test 文件
export interface Iprops {
  data: cdFang.IhouseData[];
}

const DoubleAxisGraph: React.FunctionComponent<Iprops> = ({ data }) => {
  const dataGroupByMonth = _.groupBy(data, (item) =>
    dayjs(item.beginTime).format('M月')
  );

  const chartData = Object.keys(dataGroupByMonth).map((key) => {
    const houseNumber = _.sumBy(dataGroupByMonth[key], (item) => item.number);
    const builderBumber = dataGroupByMonth[key].length;
    return {
      date: key,
      houseNumber,
      builderBumber,
    };
  });

  const scale = {
    builderBumber: {
      alias: BUILDER_NUMBER,
    },
    houseNumber: {
      min: 0,
      alias: HOUSE_NUMBER,
    },
  };
  return (
    <Chart height={400} scale={scale} forceFit data={chartData}>
      <Axis />
      <Tooltip />
      <Geom type="interval" position="date*houseNumber" />
      <Geom
        type="line"
        position="date*builderBumber"
        color={RISE_COLOR}
        size={3}
        shape="smooth"
      />
    </Chart>
  );
};

export default DoubleAxisGraph;
