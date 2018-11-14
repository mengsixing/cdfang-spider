import * as util from '../../nodeuii/src/util.js';

import chai from 'chai';
var assert = chai.assert;
var expect = chai.expect;

describe('transformArray测试', function() {
	it('transformArray返回参数长度是否正确？', function() {
		assert.typeOf(util.transformArray, 'function');
		expect(
			util.transformArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
		).to.have.lengthOf(12);
	});
});
