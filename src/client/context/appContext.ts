import * as React from 'react';

export interface IappContext {
  allData: cdFang.IhouseData[];
  activityKey: number;
  selectedYear: number;
  changeData(data: cdFang.IhouseData[]): void;
  changeActivityKey(key: number): void;
  changeSelectedYear(key: number): void;
  getCurrentHouse(): cdFang.IhouseData[];
}

export const globalData: IappContext = {
  allData: [],
  activityKey: 6,
  selectedYear: 0,
  changeData(data): void {
    this.allData = data;
  },
  changeActivityKey(key): void {
    this.activityKey = key;
  },
  changeSelectedYear(key): void {
    this.selectedYear = key;
  },
  getCurrentHouse(): cdFang.IhouseData[] {
    return this.allData.filter(item => item.status !== '报名结束');
  }
};

export const AppContext = React.createContext<IappContext>(globalData);
