import chai from 'chai';
import * as util from '../../src/nodeuii/utils';

const { assert, expect } = chai;

describe('transformArray测试', () => {
  it('transformArray返回参数长度是否正确？', () => {
    assert.typeOf(util.transformArray, 'function');
    expect(util.transformArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])).to.have.lengthOf(12);
  });
});
