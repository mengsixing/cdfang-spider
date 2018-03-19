import React from 'react'
import Head from 'next/head'
import { Table, Icon, Divider } from 'antd';

const columns = [{
  title: '区域',
  dataIndex: 'area',
  key: 'area',
  render: text => <a href="#">{text}</a>,
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

export default class extends React.Component {
  static async getInitialProps({query,res}) {
    console.log(res);
    return { query,array:res.myData }
  }

  render() {
    console.log(this.props.array);
    var data= this.props.array.map((item,index)=>{
      console.log(item);
      return {
        key:index,
        area:item[2],
        name:item[3],
        number:item[6],
        beginTime:item[8],
        endTime:item[9],
        status:item[10]
      }
    })
    return (
      
      <div>
        <Head>
          <link href="https://cdn.bootcss.com/antd/3.3.0/antd.min.css" rel="stylesheet" />
        </Head>
        <Table columns={columns} dataSource={data} />
      </div>
      
    )
  }
}
