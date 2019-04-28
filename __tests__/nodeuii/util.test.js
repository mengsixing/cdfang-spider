/* eslint-disable no-undefined */
import * as util from '../../src/nodeuii/utils';

const setup = () => ({
  transformedArray: util.transformArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
});

describe('transformArray测试', () => {
  const { transformedArray } = setup();
  it('transformArray返回参数长度是否正确？', () => {
    expect(typeof util.transformArray).toBe('function');
    expect(transformedArray).toHaveLength(12);
    expect(transformedArray[0]).toEqual({
      _id: undefined,
      area: undefined,
      name: undefined,
      number: NaN,
      beginTime: undefined,
      endTime: undefined,
      status: undefined,
    });
  });
});
