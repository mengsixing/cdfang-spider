import React from 'react';
import { mount } from 'enzyme';
import { AppContext, globalData } from '../../../src/client/context/appContext';
import CurrentHouse from '../../../src/client/components/CurrentHouse';

const setup = () => {
  const appState = {
    ...globalData,
    allData: [
      {
        area: '高新南区',
        beginTime: '2018-12-27 09:00:00',
        endTime: '2018-12-29 18:00:00',
        name: '融创香璟台西苑',
        number: 56,
        status: '报名中',
      },
    ],
    activityKey: 6,
  };
  /* eslint-disable */
  const wrapper = mount(
    <AppContext.Provider value={appState}>
      <CurrentHouse />
    </AppContext.Provider>,
  );
  /* eslint-enable */
  return {
    wrapper,
  };
};

describe('CurrentHouse 组件', () => {
  const { wrapper } = setup();
  const cheerioWrapper = wrapper.render();

  it('是否渲染成功 ?', () => {
    expect(cheerioWrapper.find('.ant-list-item').length).toBe(1);
  });
});
