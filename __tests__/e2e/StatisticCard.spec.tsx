import * as React from 'react';
import { mount } from 'enzyme';
import { AppContext, globalData } from '../../src/client/context/appContext';
import StatisticCard from '../../src/client/components/StatisticCard';
import StatisticCardPast from '../../src/client/components/StatisticCard/past';
import { mockHouse } from '../../__mocks__/db';

const data = { ...globalData, allData: mockHouse };

const setup = () => {
  const wrapper = mount(
    <AppContext.Provider value={data}>
      <div>
        <StatisticCard />
        <StatisticCardPast />
      </div>
    </AppContext.Provider>
  );
  return {
    wrapper
  };
};

describe('StatisticCard 组件', () => {
  const { wrapper } = setup();
  const cheerioWrapper = wrapper.render();
  it('是否渲染成功 ?', () => {
    // 两个组件 4*2 =8
    expect(cheerioWrapper.find('.ant-card').length).toBe(4 * 2);
  });
});
