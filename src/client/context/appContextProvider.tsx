/* eslint-disable no-use-before-define, @typescript-eslint/no-use-before-define */
import React, { useState } from 'react';
import { AppContext, IappContext } from './appContext';

const AppProvider = ({ children }: React.Props<{ value: IappContext }>) => {
  const changeData = (data: cdFang.IhouseData[]) => {
    changeAppState((prevState) => {
      return {
        ...prevState,
        allData: data,
      };
    });
  };

  const changeActivityKey = (key: string) => {
    changeAppState((prevState) => {
      return {
        ...prevState,
        activityKey: key,
      };
    });
  };

  const changeSelectedYear = (year: number) => {
    changeAppState((prevState) => {
      return {
        ...prevState,
        selectedYear: year,
      };
    });
  };

  const changeLoading = (isLoading: boolean) => {
    changeAppState((prevState) => {
      return {
        ...prevState,
        isLoading,
      };
    });
  };

  const initAppState: IappContext = {
    allData: [],
    activityKey: '天府新区',
    selectedYear: 0,
    isLoading: false,
    changeData,
    changeActivityKey,
    changeSelectedYear,
    changeLoading,
  };

  const [appState, changeAppState] = useState(initAppState);

  return <AppContext.Provider value={appState}>{children}</AppContext.Provider>;
};

export default AppProvider;
