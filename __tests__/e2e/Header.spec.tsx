import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { mount } from 'enzyme';
import Header from '../../src/client/components/Header';

const setup = () => {
  const wrapper = mount(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
  return {
    wrapper
  };
};

describe('Header 组件', () => {
  const { wrapper } = setup();

  it('是否渲染成功 ?', () => {
    expect(wrapper.exists('.cdfang-header-item')).toBe(true);
  });

  it('title是否正确 ?', () => {
    expect(wrapper.find('.ant-menu-item-selected').text()).toEqual('首页');
  });
});
