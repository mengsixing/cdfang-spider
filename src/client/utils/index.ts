import _ from 'lodash';
import dayjs from 'dayjs';
import { HOUSE_NUMBER, BUILDER_NUMBER, AREA } from '../constants';

interface Iauarter {
  thisQuarterStart: dayjs.Dayjs;
  thisQuarterEnd: dayjs.Dayjs;
}

export interface IhouseInfo {
  houseNumber: number;
  buildNumber: number;
  increaseHouseNumber?: number;
  increaseBuildNumber?: number;
  increaseHouseNumberString?: string;
  increaseBuildNumberString?: string;
}

// 当前季度
function getCurrentQuarter(dayjsObject = dayjs()): Iauarter {
  switch (dayjsObject.month()) {
    case 0:
    case 1:
    case 2:
      return {
        thisQuarterStart: dayjsObject.set('month', 0).startOf('month'),
        thisQuarterEnd: dayjsObject.set('month', 2).startOf('month')
      };
    case 3:
    case 4:
    case 5:
      return {
        thisQuarterStart: dayjsObject.set('month', 3).startOf('month'),
        thisQuarterEnd: dayjsObject.set('month', 5).startOf('month')
      };
    case 6:
    case 7:
    case 8:
      return {
        thisQuarterStart: dayjsObject.set('month', 6).startOf('month'),
        thisQuarterEnd: dayjsObject.set('month', 8).startOf('month')
      };
    case 9:
    case 10:
    case 11:
      return {
        thisQuarterStart: dayjsObject.set('month', 9).startOf('month'),
        thisQuarterEnd: dayjsObject.set('month', 11).startOf('month')
      };
    default:
      // 默认返回第一季度
      return {
        thisQuarterStart: dayjsObject.set('month', 0).startOf('month'),
        thisQuarterEnd: dayjsObject.set('month', 2).startOf('month')
      };
  }
}

// 获取增长量
function getIncreaseNumber(number: number): string {
  if (number > 0) {
    return `${number}↑`;
  }
  if (number === 0) {
    return '持平';
  }
  return `${number}↓`;
}

// 获取长度为 10 的随机string
function getRandomId(): string {
  const str = 'abcdefghijklmnopqrstuvwxyz';
  const newStrArray = [];
  for (let i = 0; i < 10; i += 1) {
    newStrArray.push(str[Math.floor(Math.random() * 26)]);
  }
  return newStrArray.join('');
}

// 获取基础柱状图数据
function getBasicColumnGraphData(allData: cdFang.IhouseData[]) {
  const areasGroup = _.groupBy(allData, (item: cdFang.IhouseData) => item.area);
  const chartHouseData: cdFang.IareaHouse[] = [];
  const chartBuilderData: cdFang.IareaBuilder[] = [];
  Object.keys(areasGroup).forEach(key => {
    chartHouseData.push({
      [AREA]: key,
      [HOUSE_NUMBER]: _.sumBy(areasGroup[key], 'number')
    });
    chartBuilderData.push({
      [AREA]: key,
      [BUILDER_NUMBER]: areasGroup[key].length
    });
  });
  return { chartHouseData, chartBuilderData };
}

function getYearList(): number[] {
  let currentYear = new Date().getFullYear();
  const startYear = 2017;
  const yearList = [];

  while (currentYear >= startYear) {
    yearList.push(currentYear);
    currentYear -= 1;
  }
  return yearList;
}

const util = {
  getAllInfo(allData: cdFang.IhouseData[]): IhouseInfo {
    const houseNumber = _.sumBy(allData, 'number');
    const buildNumber = allData.length;
    return {
      houseNumber,
      buildNumber
    };
  },
  getThisWeekInfo(allData: cdFang.IhouseData[]): IhouseInfo {
    const thisWeekStart = dayjs().set('day', 0);
    const thisWeekEnd = dayjs().set('day', 7);
    const weekData = _.filter(
      allData,
      (item: cdFang.IhouseData): boolean => {
        const beginTime = dayjs(item.beginTime);
        return beginTime > thisWeekStart && beginTime < thisWeekEnd;
      }
    );
    const houseNumber = _.sumBy(weekData, 'number');
    const buildNumber = weekData.length;
    const lastWeekInfo = this.getLastWeekInfo(allData);
    const increaseHouseNumber = houseNumber - lastWeekInfo.houseNumber;
    const increaseBuildNumber = buildNumber - lastWeekInfo.buildNumber;
    return {
      houseNumber,
      buildNumber,
      increaseHouseNumber,
      increaseBuildNumber,
      increaseHouseNumberString: getIncreaseNumber(increaseHouseNumber),
      increaseBuildNumberString: getIncreaseNumber(increaseBuildNumber)
    };
  },
  getThisMonthInfo(allData: cdFang.IhouseData[]): IhouseInfo {
    const thisMonthStart = dayjs().startOf('month');
    const thisMonthEnd = dayjs().endOf('month');
    const weekData = _.filter(
      allData,
      (item: cdFang.IhouseData): boolean => {
        const beginTime = dayjs(item.beginTime);
        return beginTime > thisMonthStart && beginTime < thisMonthEnd;
      }
    );
    const houseNumber = _.sumBy(weekData, 'number');
    const buildNumber = weekData.length;
    const lastMonthInfo = this.getLastMonthInfo(allData);
    const increaseHouseNumber = houseNumber - lastMonthInfo.houseNumber;
    const increaseBuildNumber = buildNumber - lastMonthInfo.buildNumber;
    return {
      houseNumber,
      buildNumber,
      increaseHouseNumber,
      increaseBuildNumber,
      increaseHouseNumberString: getIncreaseNumber(increaseHouseNumber),
      increaseBuildNumberString: getIncreaseNumber(increaseBuildNumber)
    };
  },
  getThisQuarterInfo(allData: cdFang.IhouseData[]): IhouseInfo {
    const time = getCurrentQuarter();
    const { thisQuarterStart, thisQuarterEnd } = time;
    const quarterData = _.filter(
      allData,
      (item: cdFang.IhouseData): boolean => {
        const beginTime = dayjs(item.beginTime);
        return beginTime > thisQuarterStart && beginTime < thisQuarterEnd;
      }
    );
    const houseNumber = _.sumBy(quarterData, 'number');
    const buildNumber = quarterData.length;
    const lastQuarterInfo = this.getLastQuarterInfo(allData);
    const increaseHouseNumber = houseNumber - lastQuarterInfo.houseNumber;
    const increaseBuildNumber = buildNumber - lastQuarterInfo.buildNumber;
    return {
      houseNumber,
      buildNumber,
      increaseHouseNumber,
      increaseBuildNumber,
      increaseHouseNumberString: getIncreaseNumber(increaseHouseNumber),
      increaseBuildNumberString: getIncreaseNumber(increaseBuildNumber)
    };
  },
  getLastWeekInfo(allData: cdFang.IhouseData[]): IhouseInfo {
    const thisWeekStart = dayjs()
      .set('day', 0)
      .add(-7, 'day');
    const thisWeekEnd = dayjs()
      .set('day', 7)
      .add(-7, 'day');
    const weekData = _.filter(
      allData,
      (item: cdFang.IhouseData): boolean => {
        const beginTime = dayjs(item.beginTime);
        return beginTime > thisWeekStart && beginTime < thisWeekEnd;
      }
    );
    const houseNumber = _.sumBy(weekData, 'number');
    const buildNumber = weekData.length;
    return {
      houseNumber,
      buildNumber
    };
  },
  getLastMonthInfo(allData: cdFang.IhouseData[]): IhouseInfo {
    const thisMonthStart = dayjs()
      .add(-1, 'month')
      .startOf('month');
    const thisMonthEnd = dayjs()
      .add(-1, 'month')
      .endOf('month');
    const weekData = _.filter(
      allData,
      (item: cdFang.IhouseData): boolean => {
        const beginTime = dayjs(item.beginTime);
        return beginTime > thisMonthStart && beginTime < thisMonthEnd;
      }
    );
    const houseNumber = _.sumBy(weekData, 'number');
    const buildNumber = weekData.length;
    return {
      houseNumber,
      buildNumber
    };
  },
  getLastQuarterInfo(allData: cdFang.IhouseData[]): IhouseInfo {
    const time = getCurrentQuarter(dayjs().add(-3, 'month'));
    const { thisQuarterStart, thisQuarterEnd } = time;
    const quarterData = _.filter(
      allData,
      (item: cdFang.IhouseData): boolean => {
        const beginTime = dayjs(item.beginTime);
        return beginTime > thisQuarterStart && beginTime < thisQuarterEnd;
      }
    );
    const houseNumber = _.sumBy(quarterData, 'number');
    const buildNumber = quarterData.length;
    return {
      houseNumber,
      buildNumber
    };
  },
  sortArea(areaArray: string[]): string[] {
    // 把主城区排在前面
    const mainArea =
      '天府新区,高新南区,龙泉驿区,金牛区,成华区,武侯区,青羊区,锦江区';
    const newArray = _.sortBy(areaArray, [
      (area: string) => -mainArea.indexOf(area)
    ]);
    return newArray;
  },
  getCurrentQuarter,
  getRandomId,
  getBasicColumnGraphData,
  getYearList
};

export default util;
