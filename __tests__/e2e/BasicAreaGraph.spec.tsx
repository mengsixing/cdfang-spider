import * as React from 'react';

import { mount } from 'enzyme';
import BasicAreaGraph, {
  Iprops
} from '../../src/client/components/BasicAreaGraph';

const setup = () => {
  const props: Iprops = {
    title: '房源数',
    data: [
      { month: '2018-08-08', 楼盘数: 8 },
      { month: '2018-08-09', 楼盘数: 9 },
      { month: '2018-08-10', 楼盘数: 10 }
    ]
  };
  const wrapper = mount(<BasicAreaGraph {...props} />);
  return {
    props,
    wrapper
  };
};

describe('BasicAreaGraph 组件', () => {
  const { wrapper, props } = setup();

  it('是否渲染成功 ?', () => {
    const subtree = wrapper.render();
    expect(subtree.find('canvas').length).toBe(1);
  });

  it('title 是否正确 ?', () => {
    expect(wrapper.prop('title')).toEqual(props.title);
    expect(wrapper.find('.chart-title').text()).toEqual(
      `${props.title} / 月(统计图)`
    );
  });
});
