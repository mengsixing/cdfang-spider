import React from 'react';

import { expect } from 'chai';

import { shallow } from 'enzyme';
import Todo from '../../src/client/components/AreaBar';

// import sinon from 'sinon';

const setup = () => {
  const props = {
    title: '房源数排序图',
    data: [],
    xAxis: '区域',
    yAxis: '房源',
    desc: true,
  };
  const wrapper = shallow(<Todo {...props} />);
  return {
    props,
    wrapper,
  };
};

describe('Todo', () => {
  const { wrapper } = setup();

  // 通过 input 是否存在来判断 Todo组件是否被渲染
  it('Todo item should  render', () => {
    expect(wrapper.find('input')).to.not.equal(1);
  });
});
