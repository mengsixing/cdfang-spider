import * as React from 'react';
import Idata from './Idata';

export interface IappContext {
  allData: Idata[];
  activityKey: number;
  changeData(data: Idata[]): void;
  changeActivityKey(key: number): void;
}

export const globalData: IappContext = {
  allData: [],
  activityKey: 6,
  changeData(data): void {
    this.allData = data;
  },
  changeActivityKey(key): void {
    this.activityKey = key;
  }
};

export const AppContext = React.createContext<IappContext>(globalData);
