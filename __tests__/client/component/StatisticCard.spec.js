import React from 'react';
import { mount } from 'enzyme';
import { AppContext, globalData } from '../../../src/client/context/appContext';
import StatisticCard from '../../../src/client/components/StatisticCard';

const setup = () => {
  /* eslint-disable */
  const wrapper = mount(
    <AppContext.Provider value={globalData}>
      <StatisticCard />
    </AppContext.Provider>
    ,
  );
  /* eslint-enable */
  return {
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
