import React from 'react';

import { mount } from 'enzyme';
import { Provider } from 'mobx-react';
import StatisticCard from '../../../src/client/components/StatisticCard';

const setup = () => {
  const appState = {
    allData: [],
    activityKey: 6,
  };
  const props = {
  };
  /* eslint-disable */
  const wrapper = mount(
    <Provider appState={appState}>
      <StatisticCard {...props} />
    </Provider>,
  );
  /* eslint-enable */
  return {
    props,
    wrapper,
  };
};

describe('StatisticCard 组件', () => {
  const { wrapper } = setup();
  const cheerioWrapper = wrapper.render();
  it('是否渲染成功 ?', () => {
    expect(cheerioWrapper.find('.ant-card').length).toBe(4);
  });
});
