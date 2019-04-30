/* eslint-disable no-undefined */
import * as util from '../../src/nodeuii/utils';

const mockArray = [
  [
    '7EFCBD1761A402A2E053AC1D15D793F3',
    '',
    '彭州市',
    '成都恒大翡翠龙庭建设项目（A地块）',
    '51018220191230',
    '第6、7、10、11栋',
    '301',
    '028-62576999 ',
    '2019-04-30 09:00:00',
    '2019-05-02 18:00:00',
    '2019-05-18',
    '正在报名',
    '查看'
  ]
];

const setup = () => ({
  transformedArray: util.transformArray(mockArray)
});

describe('transformArray测试', () => {
  const { transformedArray } = setup();
  it('transformArray返回参数长度是否正确？', () => {
    expect(typeof util.transformArray).toBe('function');
    expect(transformedArray).toHaveLength(1);
    expect(transformedArray[0]).toEqual({
      _id: '7EFCBD1761A402A2E053AC1D15D793F3',
      area: '彭州市',
      name: '成都恒大翡翠龙庭建设项目（A地块）',
      number: 301,
      beginTime: '2019-04-30 09:00:00',
      endTime: '2019-05-02 18:00:00',
      status: '正在报名'
    });
  });
});
