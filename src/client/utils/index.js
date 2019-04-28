import _ from 'lodash';
import dayjs from 'dayjs';

// 当前季度
function getCurrentQuarter(dayjsObject = dayjs()) {
  switch (dayjsObject.month()) {
    case 0:
    case 1:
    case 2:
      return {
        thisQuarterStart: dayjsObject.set('month', 0).startOf('month'),
        thisQuarterEnd: dayjsObject.set('month', 2).startOf('month'),
      };
    case 3:
    case 4:
    case 5:
      return {
        thisQuarterStart: dayjsObject.set('month', 3).startOf('month'),
        thisQuarterEnd: dayjsObject.set('month', 5).startOf('month'),
      };
    case 6:
    case 7:
    case 8:
      return {
        thisQuarterStart: dayjsObject.set('month', 6).startOf('month'),
        thisQuarterEnd: dayjsObject.set('month', 8).startOf('month'),
      };
    case 9:
    case 10:
    case 11:
      return {
        thisQuarterStart: dayjsObject.set('month', 9).startOf('month'),
        thisQuarterEnd: dayjsObject.set('month', 11).startOf('month'),
      };
    default:
      return {};
  }
}

// 获取增长量
function getIncreaseNumber(number) {
  if (number > 0) {
    return `${number}↑`;
  }
  if (number === 0) {
    return '持平';
  }
  return `${number}↓`;
}

const util = {
  getAllInfo(allData) {
    const houseNumber = _.sumBy(allData, 'number');
    const buildNumber = allData.length;
    return {
      houseNumber,
      buildNumber,
    };
  },
  getThisWeekInfo(allData) {
    const thisWeekStart = dayjs().set('day', 0);
    const thisWeekEnd = dayjs().set('day', 7);
    const weekData = _.filter(allData, (item) => {
      const beginTime = dayjs(item.beginTime);
      return beginTime > thisWeekStart && beginTime < thisWeekEnd;
    });
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
      increaseBuildNumberString: getIncreaseNumber(increaseBuildNumber),
    };
  },
  getThisMonthInfo(allData) {
    const thisMonthStart = dayjs().startOf('month');
    const thisMonthEnd = dayjs().endOf('month');
    const weekData = _.filter(allData, (item) => {
      const beginTime = dayjs(item.beginTime);
      return beginTime > thisMonthStart && beginTime < thisMonthEnd;
    });
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
      increaseBuildNumberString: getIncreaseNumber(increaseBuildNumber),
    };
  },
  getThisQuarterInfo(allData) {
    const time = getCurrentQuarter();
    const { thisQuarterStart, thisQuarterEnd } = time;
    const quarterData = _.filter(allData, (item) => {
      const beginTime = dayjs(item.beginTime);
      return beginTime > thisQuarterStart && beginTime < thisQuarterEnd;
    });
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
      increaseBuildNumberString: getIncreaseNumber(increaseBuildNumber),
    };
  },
  getLastWeekInfo(allData) {
    const thisWeekStart = dayjs()
      .set('day', 0)
      .add(-7, 'day');
    const thisWeekEnd = dayjs()
      .set('day', 7)
      .add(-7, 'day');
    const weekData = _.filter(allData, (item) => {
      const beginTime = dayjs(item.beginTime);
      return beginTime > thisWeekStart && beginTime < thisWeekEnd;
    });
    const houseNumber = _.sumBy(weekData, 'number');
    const buildNumber = weekData.length;
    return {
      houseNumber,
      buildNumber,
    };
  },
  getLastMonthInfo(allData) {
    const thisMonthStart = dayjs()
      .add(-1, 'month')
      .startOf('month');
    const thisMonthEnd = dayjs()
      .add(-1, 'month')
      .endOf('month');
    const weekData = _.filter(allData, (item) => {
      const beginTime = dayjs(item.beginTime);
      return beginTime > thisMonthStart && beginTime < thisMonthEnd;
    });
    const houseNumber = _.sumBy(weekData, 'number');
    const buildNumber = weekData.length;
    return {
      houseNumber,
      buildNumber,
    };
  },
  getLastQuarterInfo(allData) {
    const time = getCurrentQuarter(dayjs().add(-3, 'month'));
    const { thisQuarterStart, thisQuarterEnd } = time;
    const quarterData = _.filter(allData, (item) => {
      const beginTime = dayjs(item.beginTime);
      return beginTime > thisQuarterStart && beginTime < thisQuarterEnd;
    });
    const houseNumber = _.sumBy(quarterData, 'number');
    const buildNumber = quarterData.length;
    return {
      houseNumber,
      buildNumber,
    };
  },
  sortArea(areaArray) {
    // 把主城区排在前面
    const mainArea = '天府新区,高新南区,龙泉驿区,金牛区,成华区,武侯区,青羊区,锦江区';
    const newArray = _.sortBy(areaArray, [area => -mainArea.indexOf(area)]);
    return newArray;
  },
  getCurrentQuarter,
};

export default util;
