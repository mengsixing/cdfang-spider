import React from 'react';
// @ts-ignore
import DataSet from '@antv/data-set';
import dayjs from 'dayjs';
import _ from 'lodash';
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';

// 导出给 test 文件使用
export interface Iprops {
  data: cdFang.IhouseData[];
}

interface ImonthMap {
  name: string;
  [x: string]: string | number;
}

// 分组柱状图(暂未使用) https://bizcharts.net/products/bizCharts/demo/detail?id=bar-grouped-column&selectedKey=%E6%9F%B1%E7%8A%B6%E5%9B%BE
const GroupedColumnGraph: React.FunctionComponent<Iprops> = (props) => {
  const { data: array } = props;
  const arrayByMonth = _.groupBy(array, (item) =>
    dayjs(item.beginTime).startOf('month').format('YYYY-MM')
  );
  const buildObj: ImonthMap = { name: '楼盘' };
  const houseObj: ImonthMap = { name: '房源' };
  const cricleObj = [];
  let fields: string[] = [];
  Object.keys(arrayByMonth).forEach((key) => {
    const houseNumber = _.sumBy(arrayByMonth[key], 'number');
    const buildNumber = arrayByMonth[key].length;
    buildObj[key] = buildNumber;
    houseObj[key] = houseNumber;
    cricleObj.push({
      item: key,
      number: houseNumber,
    });
    fields.push(key);
  });
  fields = _.sortBy(fields, [(t: string) => dayjs(t)]);
  const data = [buildObj, houseObj];
  const ds = new DataSet();
  const dv = ds.createView().source(data);
  dv.transform({
    type: 'fold',
    fields,
    key: '月份',
    value: '数量',
  });

  return (
    <Chart height={400} forceFit data={dv}>
      <div className="chart-title">月份统计图</div>
      <Axis name="月份" />
      <Axis name="数量" />
      <Legend />
      <Tooltip />
      <Geom
        type="interval"
        position="月份*数量"
        color="name"
        select
        adjust={[{ type: 'dodge', marginRatio: 1 / 32 }]}
      />
    </Chart>
  );
};

export default React.memo(GroupedColumnGraph);
