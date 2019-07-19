import * as React from 'react';

import { mount } from 'enzyme';
import Rank, { Iprops } from '../../src/client/components/Rank';

const setup = () => {
  const props: Iprops = {
    title: '2018年06月',
    unit: '套',
    data: [
      {
        _id: '',
        name: '融创香璟台西苑',
        number: 56
      }
    ]
  };
  const wrapper = mount(<Rank {...props} />);
  return {
    props,
    wrapper
  };
};

describe('Rank 组件', () => {
  const { wrapper, props } = setup();
  const subtree = wrapper.render();
  it('title 是否正确 ?', () => {
    expect(subtree.find('.rank-title').text()).toBe(`排名：${props.title}`);
  });
  it('渲染列表是否正确 ?', () => {
    expect(subtree.find('.rank-list>li').length).toBe(props.data.length);
  });
});
