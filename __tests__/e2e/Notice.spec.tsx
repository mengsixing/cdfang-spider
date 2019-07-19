import * as React from 'react';

import { mount } from 'enzyme';
import { GlobalWithFetchMock } from 'jest-fetch-mock';
import Notice from '../../src/client/components/Notice';

const customGlobal: GlobalWithFetchMock = global as GlobalWithFetchMock;

const setup = () => {
  const wrapper = mount(<Notice />);
  return {
    wrapper
  };
};

describe('Notice 组件', () => {
  const { wrapper } = setup();
  const subtree = wrapper.render();

  it('是否渲染成功？', () => {
    expect(subtree.hasClass('notice-icon')).toBe(true);
    expect(subtree.find('svg').length).toBe(1);
  });

  it('点击获取消息', () => {
    customGlobal.fetch.mockResponseOnce(
      JSON.stringify({ data: '12345', successArray: [1, 2, 3] })
    );
    wrapper.find('Icon').simulate('click');
    expect(subtree.hasClass('notice-icon')).toBe(true);
  });
});
