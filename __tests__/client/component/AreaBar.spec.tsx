import * as React from 'react';

import { mount } from 'enzyme';
import AreaBar from '../../../src/client/components/AreaBar/index';

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
  const wrapper = mount(<AreaBar {...props} />);
  return {
    props,
    wrapper
  };
};

describe('Todo', () => {
  const { wrapper, props } = setup();

  it('是否渲染成功 ?', () => {
    expect(wrapper.exists('canvas')).toBe(false);
  });

  it('title是否正确 ?', () => {
    expect(wrapper.prop('title')).toEqual(props.title);
  });
});
