import * as React from 'react';

import { mount } from 'enzyme';
import DoubleAxisGraph, {
  Iprops
} from '../../src/client/components/DoubleAxisGraph';

const setup = () => {
  const props: Iprops = {
    data: [
      {
        area: '高新南区',
        beginTime: '2018-12-27 09:00:00',
        endTime: '2018-12-29 18:00:00',
        name: '融创香璟台西苑',
        number: 56,
        status: '报名结束',
        _id: ''
      }
    ]
  };
  const wrapper = mount(<DoubleAxisGraph {...props} />);
  return {
    props,
    wrapper
  };
};

describe('DoubleAxisGraph 组件', () => {
  const { wrapper } = setup();
  const subtree = wrapper.render();

  it('是否渲染成功 ?', () => {
    expect(subtree.find('canvas').length).toBe(1);
  });
});
