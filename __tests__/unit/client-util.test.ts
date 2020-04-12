import dayjs from 'dayjs';
import { mockHouse as mockData, mockArea } from '../../__mocks__/db';
import util from '../../src/client/utils/index';

const setup = () => ({
  currentQuarter: util.getCurrentQuarter(),
  allInfo: util.getAllInfo(mockData),
  thisWeekInfo: util.getThisWeekInfo(mockData),
  thisMonthInfo: util.getThisMonthInfo(mockData),
  thisQuarterInfo: util.getThisQuarterInfo(mockData)
});

describe('client util测试', () => {
  const {
    currentQuarter,
    allInfo,
    thisWeekInfo,
    thisMonthInfo,
    thisQuarterInfo
  } = setup();
  it('getCurrentQuarter返回参数是否正确？', () => {
    expect(typeof util.getCurrentQuarter).toBe('function');
    const quarterMap = [0, 0, 0, 0, 3, 3, 3, 6, 6, 6, 9, 9, 9];
    for (let i = 1; i <= 12; i += 1) {
      expect(
        util.getCurrentQuarter(dayjs(`2019-${i}-10`)).thisQuarterStart.month()
      ).toBe(quarterMap[i]);
    }
    expect([0, 3, 6, 9]).toContain(currentQuarter.thisQuarterStart.month());
  });
  it('getAllInfo返回参数是否正确？', () => {
    expect(typeof util.getAllInfo).toBe('function');
    expect(allInfo).toHaveProperty('houseNumber');
    expect(allInfo).toHaveProperty('buildNumber');
    expect(typeof allInfo.houseNumber).toBe('number');
    expect(typeof allInfo.buildNumber).toBe('number');
  });
  it('getThisWeekInfo返回参数是否正确？', () => {
    expect(typeof util.getThisWeekInfo).toBe('function');
    expect(thisWeekInfo).toHaveProperty('houseNumber');
    expect(thisWeekInfo).toHaveProperty('buildNumber');
    expect(thisWeekInfo).toHaveProperty('increaseBuildNumber');
    expect(thisWeekInfo).toHaveProperty('increaseHouseNumber');
    expect(thisWeekInfo).toHaveProperty('increaseBuildNumberString');
    expect(thisWeekInfo).toHaveProperty('increaseHouseNumberString');
    expect(typeof thisWeekInfo.houseNumber).toBe('number');
    expect(typeof thisWeekInfo.buildNumber).toBe('number');
  });
  it('getThisMonthInfo返回参数是否正确？', () => {
    expect(typeof util.getThisMonthInfo).toBe('function');
    expect(thisMonthInfo).toHaveProperty('houseNumber');
    expect(thisMonthInfo).toHaveProperty('buildNumber');
    expect(thisMonthInfo).toHaveProperty('increaseBuildNumber');
    expect(thisMonthInfo).toHaveProperty('increaseHouseNumber');
    expect(thisMonthInfo).toHaveProperty('increaseBuildNumberString');
    expect(thisMonthInfo).toHaveProperty('increaseHouseNumberString');
    expect(typeof thisMonthInfo.houseNumber).toBe('number');
    expect(typeof thisMonthInfo.buildNumber).toBe('number');
  });
  it('getThisQuarterInfo返回参数是否正确？', () => {
    expect(typeof util.getThisQuarterInfo).toBe('function');
    expect(thisQuarterInfo).toHaveProperty('houseNumber');
    expect(thisQuarterInfo).toHaveProperty('buildNumber');
    expect(thisQuarterInfo).toHaveProperty('increaseBuildNumber');
    expect(thisQuarterInfo).toHaveProperty('increaseHouseNumber');
    expect(thisQuarterInfo).toHaveProperty('increaseBuildNumberString');
    expect(thisQuarterInfo).toHaveProperty('increaseHouseNumberString');
    expect(typeof thisQuarterInfo.houseNumber).toBe('number');
    expect(typeof thisQuarterInfo.buildNumber).toBe('number');
  });
  it('sortArea返回参数是否正确？', () => {
    expect(typeof util.sortArea).toBe('function');
    expect(util.sortArea(mockArea)).toHaveLength(mockArea.length);
  });
});
