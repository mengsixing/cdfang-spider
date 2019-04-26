import React from 'react';

import { mount } from 'enzyme';
import { AppContext, globalData } from '../../../src/client/context/appContext';
import ChartPanel from '../../../src/client/components/ChartPanel';

const setup = () => {
    const props = {
        data: [
            {
                area: '高新南区',
                beginTime: '2018-12-27 09:00:00',
                endTime: '2018-12-29 18:00:00',
                name: '融创香璟台西苑',
                number: 56,
                status: '报名结束',
            },
        ],
    };
    /* eslint-disable */
  const wrapper = mount(
    <AppContext.Provider value={globalData}>
      <ChartPanel {...props} />
    </AppContext.Provider>,
  );
  /* eslint-enable */
    return {
        props,
        wrapper,
    };
};

describe('ChartPanel 组件', () => {
    const { wrapper } = setup();
    const cheerioWrapper = wrapper.render();

    it('是否渲染成功 ?', () => {
        expect(wrapper.exists('.chart-title')).toBe(true);
        expect(cheerioWrapper.find('canvas').length).toBe(2);
    });

    it('子组件是否渲染 ?', () => {
        expect(wrapper.find('BarGraph').length).toBe(1);
        expect(wrapper.find('CircleGraph').length).toBe(1);
    });
});
