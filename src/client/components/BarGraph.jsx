import React from 'react';
import DataSet from '@antv/data-set';
import dayjs from 'dayjs';
import _ from 'lodash';
import PropTypes from 'prop-types';
import {
  Chart, Geom, Axis, Tooltip, Legend,
} from 'bizcharts';

class BarGraph extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { data: array } = this.props;
    const arrayByMonth = _.groupBy(array, item => dayjs(item.beginTime)
      .startOf('month')
      .format('YYYY-MM'));
    const buildObj = { name: '楼盘' };
    const houseObj = { name: '房源' };
    const cricleObj = [];
    let fields = [];
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
    fields = _.sortBy(fields, [o => dayjs(o)]);
    const data = [buildObj, houseObj];
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
      type: 'fold',
      fields, // [ 'Jan.','Feb.','Mar.','Apr.','May','Jun.','Jul.','Aug.' ], // 展开字段集
      key: '月份',
      value: '数量',
    });

    return (
      <Chart height={400} forceFit data={dv}>
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
  }
}

BarGraph.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default BarGraph;
