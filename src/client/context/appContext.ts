import * as React from 'react';

export interface IappContext {
  allData: cdFang.IhouseData[];
  activityKey: string;
  selectedYear: number;
  changeData(data: cdFang.IhouseData[]): void;
  changeActivityKey(key: string): void;
  changeSelectedYear(key: number): void;
}

// 初始化context，具体的方法在provider中实现
export const globalData: IappContext = {
  allData: [],
  activityKey: '天府新区',
  selectedYear: 0,
  changeData() {},
  changeActivityKey() {},
  changeSelectedYear() {}
};

export const AppContext = React.createContext<IappContext>(globalData);
