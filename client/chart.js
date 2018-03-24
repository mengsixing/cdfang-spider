import React from 'react'
import DataSet from '@antv/data-set';
import moment from 'moment'
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';



class MyChart extends React.Component{
  
  render(){
    console.log('接收到的array',this.props.data);
    var array=this.props.data;
    var arrayByMonth= _.groupBy(array,item=>{
      return moment(item.beginTime).startOf('month').format('YYYY-MM');
    });
    
    var buildObj={name:'楼盘'};
    var houseObj={name:'房源'};
    var fields=[];
    Object.keys(arrayByMonth).forEach((key)=>{
      var houseNumber=_.sumBy(arrayByMonth[key],'number');
      var buildNumber=arrayByMonth[key].length;
      buildObj[key]=buildNumber;
      houseObj[key]=houseNumber;
      fields.push(key);
    });
    fields=_.sortBy(fields, [function(o) { return moment(o); }]);
    console.log('groupby hou',houseObj);
    const data = [
      buildObj,houseObj
      //{ name:'楼盘', 'Jan.': 18.9, 'Feb.': 28.8, 'Mar.' :39.3, 'Apr.': 81.4, 'May': 47, 'Jun.': 20.3, 'Jul.': 24, 'Aug.': 35.6 },
      //{ name:'房源', 'Jan.': 12.4, 'Feb.': 23.2, 'Mar.' :34.5, 'Apr.': 99.7, 'May': 52.6, 'Jun.': 35.5, 'Jul.': 37.4, 'Aug.': 42.4}
    ];
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
      type: 'fold',
      fields: fields,//[ 'Jan.','Feb.','Mar.','Apr.','May','Jun.','Jul.','Aug.' ], // 展开字段集
      key: '月份', // key字段
      value: '数量', // value字段
    });
    
    return (
      <Chart height={400} forceFit data={dv}>
        <Axis name="月份" />
        <Axis name="数量" />
        <Legend />
        <Tooltip crosshairs={{type : "y"}}/>
        <Geom type='interval' position="月份*数量" color={'name'} adjust={[{type: 'dodge',marginRatio: 1/32}]} />
      </Chart>
    )
  }
}

export default MyChart;
