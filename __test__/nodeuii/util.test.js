import chai from 'chai';
import * as util from '../../src/nodeuii/utils';

const { expect } = chai;

describe('transformArray测试', () => {
  it('transformArray返回参数长度是否正确？', () => {
    expect(util.transformArray).to.be.an('function');
    expect(util.transformArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])).to.have.lengthOf(12);
    expect(util.transformArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])[0]).to.have.keys(
      '_id',
      'area',
      'name',
      'number',
      'beginTime',
      'endTime',
      'status',
    );
  });
});
