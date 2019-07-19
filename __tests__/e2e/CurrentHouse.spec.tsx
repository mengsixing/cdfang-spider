import * as React from 'react';
import { mount } from 'enzyme';
import {
  AppContext,
  globalData,
  IappContext
} from '../../src/client/context/appContext';
import CurrentHouse from '../../src/client/components/CurrentHouse';

const setup = () => {
  const appState: IappContext = {
    ...globalData,
    allData: [
      {
        _id: '',
        area: '高新南区',
        beginTime: '2018-12-27 09:00:00',
        endTime: '2018-12-29 18:00:00',
        name: '融创香璟台西苑',
        number: 56,
        status: '报名中'
      }
    ],
    activityKey: '高新南区'
  };
  const wrapper = mount(
    <AppContext.Provider value={appState}>
      <CurrentHouse />
    </AppContext.Provider>
  );
  return {
    wrapper
  };
};

describe('CurrentHouse 组件', () => {
  const { wrapper } = setup();
  const subtree = wrapper.render();

  it('是否渲染成功 ?', () => {
    expect(subtree.find('.ant-collapse-header').text()).toBe('正在登记');
    expect(subtree.find('.ant-list-item').length).toBe(1);
  });
});
