import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, RenderResult } from '@testing-library/react';
import { AppContext, globalData } from '../../src/client/context/appContext';
import StatisticCard from '../../src/client/components/StatisticCard';
import StatisticCardPast from '../../src/client/components/StatisticCard/past';
import { mockHouse } from '../../__mocks__/db';

const data = { ...globalData, allData: mockHouse };

let wrapper: RenderResult;
describe('StatisticCard 组件', () => {
  beforeEach(() => {
    wrapper = render(
      <AppContext.Provider value={data}>
        <div>
          <StatisticCard />
          <StatisticCardPast />
        </div>
      </AppContext.Provider>
    );
  });
  it('是否渲染成功 ?', () => {
    // 两个组件 4*2 =8
    expect(wrapper.container.querySelectorAll('.ant-card').length).toBe(4 * 2);
  });
});
