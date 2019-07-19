import * as React from 'react';

import { mount } from 'enzyme';
import BasicColumnGraph from '../../src/client/components/BasicColumnGraph';

const setup = () => {
  const props = {
    title: '房源数排序图',
    data: [
      { 区域: '新津县', 楼盘数: 8 },
      { 区域: '金堂县', 楼盘数: 7 },
      { 区域: '双流区', 楼盘数: 7 }
    ],
    xAxis: '区域',
    yAxis: '房源',
    desc: true
  };
  const wrapper = mount(<BasicColumnGraph {...props} />);
  return {
    props,
    wrapper
  };
};

describe('BasicColumnGraph 组件', () => {
  const { wrapper, props } = setup();

  it('是否渲染成功 ?', () => {
    const subtree = wrapper.render();
    expect(subtree.find('canvas').length).toBe(1);
  });

  it('title是否正确 ?', () => {
    expect(wrapper.prop('title')).toEqual(props.title);
  });
});
