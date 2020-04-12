import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, RenderResult } from '@testing-library/react';
import { AppContext, globalData } from '../../src/client/context/appContext';
import ChartPanel, { Iprops } from '../../src/client/components/ChartPanel';

const props: Iprops = {
  data: [
    {
      _id: '',
      area: '高新南区',
      beginTime: '2018-12-27 09:00:00',
      endTime: '2018-12-29 18:00:00',
      name: '融创香璟台西苑',
      number: 56,
      status: '报名结束',
    },
  ],
  panelKey: '高新南区',
  activityKey: '高新南区',
};

let wrapper: RenderResult;
describe('ChartPanel 组件', () => {
  beforeEach(() => {
    wrapper = render(
      <AppContext.Provider value={globalData}>
        <ChartPanel {...props} />
      </AppContext.Provider>
    );
  });

  it('子图表是否渲染正确渲染', () => {
    expect(wrapper.container.querySelectorAll('canvas').length).toBe(2);
    expect(wrapper.container.querySelector('.rank')).toBeInTheDocument();
  });
});
