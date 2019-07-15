import * as React from 'react';

import { mount } from 'enzyme';
import { AppContext, globalData } from '../../src/client/context/appContext';
import ChartPanel, { Iprops } from '../../src/client/components/ChartPanel';

const setup = () => {
  const props: Iprops = {
    data: [
      {
        _id: '',
        area: '高新南区',
        beginTime: '2018-12-27 09:00:00',
        endTime: '2018-12-29 18:00:00',
        name: '融创香璟台西苑',
        number: 56,
        status: '报名结束'
      }
    ],
    panelKey: '高新南区',
    activityKey: '高新南区'
  };
  const wrapper = mount(
    <AppContext.Provider value={globalData}>
      <ChartPanel {...props} />
    </AppContext.Provider>
  );
  return {
    props,
    wrapper
  };
};

describe('ChartPanel 组件', () => {
  const { wrapper } = setup();
  const subtree = wrapper.render();

  it('是否渲染成功 ?', () => {
    expect(wrapper.exists('.chart-title')).toBe(true);
  });

  it('子组件是否渲染 ?', () => {
    expect(subtree.find('canvas').length).toBe(2);
    expect(subtree.find('.rank').length).toBe(1);
  });
});
