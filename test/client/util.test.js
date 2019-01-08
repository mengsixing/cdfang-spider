import dayjs from 'dayjs';
import chai from 'chai';
import util from '../../client/util';
import { mockHouse as mockData, mockArea } from '../mock/db';

const { assert, expect } = chai;

describe('client util测试', () => {
  it('getCurrentQuarter返回参数是否正确？', () => {
    assert.typeOf(util.getCurrentQuarter, 'function');
    const quarterMap = [0, 0, 0, 0, 3, 3, 3, 6, 6, 6, 9, 9, 9];
    for (let i = 1; i <= 12; i += 1) {
      expect(util.getCurrentQuarter(dayjs(`2019-${i}-10`)).thisQuarterStart.month()).eq(
        quarterMap[i],
      );
    }
    expect(util.getCurrentQuarter().thisQuarterStart.month()).eq(dayjs().month());
  });
  it('getAllInfo返回参数是否正确？', () => {
    assert.typeOf(util.getAllInfo, 'function');
    expect(util.getAllInfo(mockData)).to.have.property('houseNumber');
    expect(util.getAllInfo(mockData)).to.have.property('buildNumber');
    expect(util.getAllInfo(mockData).houseNumber).to.be.a('number');
    expect(util.getAllInfo(mockData).buildNumber).to.be.a('number');
  });
  it('getThisWeekInfo返回参数是否正确？', () => {
    assert.typeOf(util.getThisWeekInfo, 'function');
    expect(util.getThisWeekInfo(mockData)).to.have.property('houseNumber');
    expect(util.getThisWeekInfo(mockData)).to.have.property('buildNumber');
    expect(util.getThisWeekInfo(mockData).houseNumber).to.be.a('number');
    expect(util.getThisWeekInfo(mockData).buildNumber).to.be.a('number');
  });
  it('getThisMonthInfo返回参数是否正确？', () => {
    assert.typeOf(util.getThisMonthInfo, 'function');
    expect(util.getThisMonthInfo(mockData)).to.have.property('houseNumber');
    expect(util.getThisMonthInfo(mockData)).to.have.property('buildNumber');
    expect(util.getThisMonthInfo(mockData).houseNumber).to.be.a('number');
    expect(util.getThisMonthInfo(mockData).buildNumber).to.be.a('number');
  });
  it('getThisQuarterInfo返回参数是否正确？', () => {
    assert.typeOf(util.getThisQuarterInfo, 'function');
    expect(util.getThisQuarterInfo(mockData)).to.have.property('houseNumber');
    expect(util.getThisQuarterInfo(mockData)).to.have.property('buildNumber');
    expect(util.getThisQuarterInfo(mockData).houseNumber).to.be.a('number');
    expect(util.getThisQuarterInfo(mockData).buildNumber).to.be.a('number');
  });
  it('sortArea返回参数是否正确？', () => {
    assert.typeOf(util.sortArea, 'function');
    expect(util.sortArea(mockArea)).to.have.lengthOf(mockArea.length);
  });
});
