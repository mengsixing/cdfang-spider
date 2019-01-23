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
  /* eslint-enable */
  return {
    props,
    wrapper,
  };
};

describe('Notice 组件', () => {
  const { wrapper } = setup();
  const cheerioWrapper = wrapper.render();

  it('是否渲染成功 ?', () => {
    expect(cheerioWrapper.find('canvas').length).toBe(0);
  });
});
