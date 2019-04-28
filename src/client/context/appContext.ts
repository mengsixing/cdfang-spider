import * as React from 'react';
import Idata from './Idata';

interface IAppContext {
    allData: Array<Idata>;
    activityKey: number;
    changeData(data: Array<Idata>): void;
    changeActivityKey(key: number): void;
}

export const globalData: IAppContext = {
    allData: [],
    activityKey: 6,
    changeData(data) {
        this.allData = data;
    },
    changeActivityKey(key) {
        this.activityKey = key;
    }
};

export const AppContext = React.createContext<IAppContext>(globalData);
