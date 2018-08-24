import util from '../../client/util';
import { mockHouse as mockData, mockArea } from '../mock/db';

import chai from 'chai';
var assert = chai.assert;
var expect = chai.expect;

describe('client util测试', function() {
	it('getCurrentQuarter返回参数是否正确？', function() {
		assert.typeOf(util.getCurrentQuarter, 'function');
		expect(util.getCurrentQuarter()).to.have.property('thisQuarterStart');
		expect(util.getCurrentQuarter()).to.have.property('thisQuarterEnd');
		for (var i = 0; i < 12; i++) {
			expect(util.getCurrentQuarter(i)).to.have.property(
				'thisQuarterStart'
			);
			expect(util.getCurrentQuarter(i)).to.have.property(
				'thisQuarterEnd'
			);
		}
	});
	it('getAllInfo返回参数是否正确？', function() {
		assert.typeOf(util.getAllInfo, 'function');
		expect(util.getAllInfo(mockData)).to.have.property('houseNumber');
		expect(util.getAllInfo(mockData)).to.have.property('buildNumber');
		expect(util.getAllInfo(mockData).houseNumber).to.be.a('number');
		expect(util.getAllInfo(mockData).buildNumber).to.be.a('number');
	});
	it('getThisWeekInfo返回参数是否正确？', function() {
		assert.typeOf(util.getThisWeekInfo, 'function');
		expect(util.getThisWeekInfo(mockData)).to.have.property('houseNumber');
		expect(util.getThisWeekInfo(mockData)).to.have.property('buildNumber');
		expect(util.getThisWeekInfo(mockData).houseNumber).to.be.a('number');
		expect(util.getThisWeekInfo(mockData).buildNumber).to.be.a('number');
	});
	it('getThisMonthInfo返回参数是否正确？', function() {
		assert.typeOf(util.getThisMonthInfo, 'function');
		expect(util.getThisMonthInfo(mockData)).to.have.property('houseNumber');
		expect(util.getThisMonthInfo(mockData)).to.have.property('buildNumber');
		expect(util.getThisMonthInfo(mockData).houseNumber).to.be.a('number');
		expect(util.getThisMonthInfo(mockData).buildNumber).to.be.a('number');
	});
	it('getThisQuarterInfo返回参数是否正确？', function() {
		assert.typeOf(util.getThisQuarterInfo, 'function');
		expect(util.getThisQuarterInfo(mockData)).to.have.property(
			'houseNumber'
		);
		expect(util.getThisQuarterInfo(mockData)).to.have.property(
			'buildNumber'
		);
		expect(util.getThisQuarterInfo(mockData).houseNumber).to.be.a('number');
		expect(util.getThisQuarterInfo(mockData).buildNumber).to.be.a('number');
	});
	it('sortArea返回参数是否正确？', function() {
		assert.typeOf(util.sortArea, 'function');
		expect(util.sortArea(mockArea)).to.have.lengthOf(mockArea.length);
	});
});
