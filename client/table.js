import React from 'react'
import { Table, Icon, Divider } from 'antd';

const columns = [{
  title: '区域',
  dataIndex: 'area',
  key: 'area',
}, {
  title: '项目名称',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '住房套数',
  dataIndex: 'number',
  key: 'number',
}, {
  title: '登记开始时间',
  dataIndex: 'beginTime',
  key: 'beginTime',
},{
  title: '登记结束时间',
  dataIndex: 'endTime',
  key: 'endTime',
},{
  title: '报名状态',
  dataIndex: 'status',
  key: 'status',
}];

class CommonTable extends React.Component {
  constructor(props){
    super();
  }
  render(){
    console.log(this.props.data);
    var data=this.props.data.map((item)=>{
      item.key=item._id;
      return item;
    });
    return <Table columns={columns} dataSource={data} />
  }
}

export default CommonTable;
