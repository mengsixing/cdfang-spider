import React from 'react';

export const globalData = {
  allData: [],
  activityKey: 6,
  changeData(data) {
    this.allData = data;
  },
  changeActivityKey(key) {
    this.activityKey = key;
  },
};

export const AppContext = React.createContext();
