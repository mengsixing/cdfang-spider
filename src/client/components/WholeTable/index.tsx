import * as React from 'react';
import { Table } from 'antd';
import { AppContext } from '../../context/appContext';

const { useContext } = React;

interface Iprops {
  areaList: string[];
}

function CommonTable({ areaList }: Iprops) {
  const appState = useContext(AppContext);
  const nameFilter = areaList.map(item => ({
    text: item,
    value: item
  }));
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columns: any[] = [
    {
      title: '区域',
      dataIndex: 'area',
      key: 'area',
      filters: nameFilter,
      filterMultiple: true,
      onFilter: (value: string, datalist: Idata) =>
        datalist.area.indexOf(value) === 0
    },
    {
      title: '项目名称',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '住房套数',
      dataIndex: 'number',
      key: 'number',
      sorter: (a: Idata, b: Idata): boolean => a.number > b.number
    },
    {
      title: '登记开始时间',
      dataIndex: 'beginTime',
      key: 'beginTime',
      sorter: (a: Idata, b: Idata) =>
        new Date(a.beginTime).getTime() - new Date(b.beginTime).getTime()
    },
    {
      title: '登记结束时间',
      dataIndex: 'endTime',
      key: 'endTime',
      sorter: (a: Idata, b: Idata) =>
        new Date(a.endTime).getTime() - new Date(b.endTime).getTime()
    },
    {
      title: '报名状态',
      dataIndex: 'status',
      key: 'status',
      filters: [
        {
          text: '未报名',
          value: '未报名'
        },
        {
          text: '正在报名',
          value: '正在报名'
        },
        {
          text: '报名结束',
          value: '报名结束'
        }
      ],
      filterMultiple: true,
      onFilter: (value: string, datalist: Idata) => {
        return datalist.status.indexOf(value) === 0;
      },
      render: (text: string) => {
        if (text !== '报名结束') {
          return <span style={{ color: 'green' }}>{text}</span>;
        }
        return text;
      }
    }
  ];

  // eslint-disable-next-line no-underscore-dangle
  const data = appState.allData.map(item => ({ key: item._id, ...item }));

  return (
    <div className="margin-white">
      <Table
        title={() => '汇总表'}
        columns={columns}
        dataSource={data}
        locale={{
          filterTitle: '筛选',
          filterConfirm: '确定',
          filterReset: '重置',
          emptyText: '暂无数据'
        }}
      />
    </div>
  );
}

export default CommonTable;
