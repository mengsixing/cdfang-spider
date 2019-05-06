/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState } from 'react';
import { AppContext } from './appContext';

const AppProvider = ({ children }) => {
  const changeData = data => {
    changeAppState(prevState => {
      return {
        ...prevState,
        allData: data
      };
    });
  };

  const changeActivityKey = (key: string) => {
    changeAppState(prevState => {
      return {
        ...prevState,
        activityKey: key
      };
    });
  };

  const changeSelectedYear = (year: number) => {
    changeAppState(prevState => {
      return {
        ...prevState,
        selectedYear: year
      };
    });
  };

  // const getCurrentHouse = (): cdFang.IhouseData[] => {
  //   setTimeout(() => {
  //     console.log(appState.allData);
  //   }, 2000);
  //   return appState.allData.filter(item => item.status !== '报名结束');
  // };

  const initAppState = {
    allData: [],
    activityKey: '天府新区',
    selectedYear: 0,
    changeData,
    changeActivityKey,
    changeSelectedYear
  };

  const [appState, changeAppState] = useState(initAppState);

  return <AppContext.Provider value={appState}>{children}</AppContext.Provider>;
};

export default AppProvider;
