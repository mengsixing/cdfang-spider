import * as React from 'react';
import { mount } from 'enzyme';
import { AppContext, globalData } from '../../../src/client/context/appContext.ts';
import StatisticCard from '../../../src/client/components/StatisticCard/index.tsx';

const setup = () => {
  const wrapper = mount(
    <AppContext.Provider value={globalData}>
      <StatisticCard />
    </AppContext.Provider>
    ,
  );
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
