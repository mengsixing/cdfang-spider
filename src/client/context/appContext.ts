import React from 'react';

export interface IappContext {
  allData: cdFang.IhouseData[];
  activityKey: string;
  selectedYear: number;
  isLoading: boolean;
  changeData(data: cdFang.IhouseData[]): void;
  changeActivityKey(key: string): void;
  changeSelectedYear(key: number): void;
  changeLoading(isLoading: boolean): void;
}

// 初始化 context，具体的方法在 provider 中实现
export const globalData: IappContext = {
  allData: [],
  activityKey: '天府新区',
  selectedYear: 0,
  isLoading: false,
  changeData:()=>{},
  changeActivityKey:()=>{},
  changeSelectedYear:()=>{},
  changeLoading:()=>{}
};

export const AppContext = React.createContext<IappContext>(globalData);
