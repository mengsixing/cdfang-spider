/* eslint-disable no-undefined */
import * as util from '../../src/nodeuii/utils';

const setup = () => ({
  transformedArray: util.transformArray(['1'])
});

describe('transformArray测试', () => {
  const { transformedArray } = setup();
  it('transformArray返回参数长度是否正确？', () => {
    expect(typeof util.transformArray).toBe('function');
    expect(transformedArray).toHaveLength(1);
    expect(transformedArray[0]).toEqual({
      _id: '1',
      area: undefined,
      name: undefined,
      number: NaN,
      beginTime: undefined,
      endTime: undefined,
      status: undefined
    });
  });
});
