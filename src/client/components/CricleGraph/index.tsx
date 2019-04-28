import * as React from 'react';
import * as _ from 'lodash';
import * as dayjs from 'dayjs';
import { Chart, Geom, Axis, Tooltip, Coord, Label, Guide } from 'bizcharts';
import * as DataSet from '@antv/data-set';
import './styles.less';
import Idata from '../../context/Idata';

const { DataView } = DataSet;
const { Html } = Guide;

interface Iprops {
  isChangeTab: boolean;
  data: Idata[];
  changeMonth(monthString: string): void;
}

function CircleGraph({ data: array, changeMonth }: Iprops) {
  function selectMonth(monthString) {
    changeMonth(monthString);
  }
  const arrayByMonth = _.groupBy(array, item =>
    dayjs(item.beginTime)
      .startOf('month')
      .format('YYYY-MM')
  );
  let cricleArray = [];
  Object.keys(arrayByMonth).forEach(key => {
    const houseNumber = _.sumBy(arrayByMonth[key], 'number');
    cricleArray.push({
      item: dayjs(key).format('YYYY年MM月'),
      number: houseNumber,
      date: key
    });
  });
  // 按日期排序
  cricleArray = _.sortBy(cricleArray, 'date');
  const dv = new DataView();
  dv.source(cricleArray).transform({
    type: 'percent',
    field: 'number',
    dimension: 'item',
    as: 'percent'
  });
  const cols = {
    percent: {
      formatter: val => `${(val * 100).toFixed(2)}%`
    }
  };
  const houseNumber = _.sumBy(array, 'number');
  const guideHtml = `
  <div style="color:#8c8c8c;font-size:1em;text-align: center;width: 10em;">总计<br><span style="color:#262626;font-size:1.5em">${houseNumber}</span>套</div>
  `;
  return (
    <Chart
      height={400}
      data={dv}
      scale={cols}
      forceFit
      onIntervalClick={selectMonth}
    >
      <div className="chart-title">房源分部图</div>
      <Coord type="theta" radius={0.75} innerRadius={0.6} />
      <Axis name="percent" />
      <Tooltip
        showTitle={false}
        itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
      />
      <Guide>
        <Html
          position={['50%', '50%']}
          html={guideHtml}
          alignX="middle"
          alignY="middle"
        />
      </Guide>
      <Geom
        select={[
          true,
          {
            animate: false
          }
        ]}
        type="intervalStack"
        position="percent"
        color="item"
        tooltip={[
          'item*percent',
          (item, percent) => ({
            name: item,
            value: `${(percent * 100).toFixed(2)}%`
          })
        ]}
        style={{ lineWidth: 1, stroke: '#fff' }}
      >
        <Label
          content="percent"
          formatter={(val, item) => `${item.point.item}: ${val}`}
        />
      </Geom>
    </Chart>
  );
}

function shouldComponentUpdate(prevProps, nextProps) {
  if (nextProps.data.length !== prevProps.data.length) {
    return false;
  }
  if (nextProps.isChangeTab) {
    return false;
  }
  return true;
}

export default React.memo(CircleGraph, shouldComponentUpdate);
