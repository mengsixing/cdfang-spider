import * as React from 'react';

export interface IappContext {
  allData: Idata[];
  activityKey: number;
  selectedYear: number;
  changeData(data: Idata[]): void;
  changeActivityKey(key: number): void;
  changeSelectedYear(key: number): void;
  getCurrentHouse(): Idata[];
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
  getCurrentHouse(): Idata[] {
    return this.allData.filter(item => item.status !== '报名结束');
  }
};

export const AppContext = React.createContext<IappContext>(globalData);
