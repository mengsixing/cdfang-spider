import React from 'react';

import { mount } from 'enzyme';
import { Provider } from 'mobx-react';
import Notice from '../../src/client/components/Notice';

const setup = () => {
  const appState = {
    allData: [],
    activityKey: 6,
  };
  const props = {};
  /* eslint-disable */
  const wrapper = mount(
    <Provider appState={appState}>
      <Notice {...props} />
    </Provider>,
  );
  return {
    props,
    wrapper,
  };
};

describe('Notice 组件', () => {
  const { wrapper } = setup();
  const cheerioWrapper = wrapper.render();

  it('是否渲染成功 ?', () => {
    expect(cheerioWrapper.hasClass('notice-icon')).toBe(true);
    expect(cheerioWrapper.find('svg').length).toBe(1);
  });

  it('点击获取消息 ?', () => {
    fetch.mockResponseOnce(JSON.stringify({ data: '12345',successArray:[1,2,3] }))
    wrapper.find('Icon').simulate('click');
    expect(cheerioWrapper.hasClass('notice-icon')).toBe(true);
  });
});
