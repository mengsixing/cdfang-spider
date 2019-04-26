import React from 'react';

import { render } from 'enzyme';
import { AppContext, globalData } from '../../../src/client/context/appContext';
import WholeTable from '../../../src/client/components/WholeTable';
import { mockHouse, mockArea } from '../../../__mocks__/db';

const setup = () => {
    const appState = {
        ...globalData,
        allData: mockHouse,
        activityKey: 6,
    };
    const props = {
        areaList: mockArea,
    };
    /* eslint-disable */
  const wrapper = render(
    <AppContext.Provider value={appState}>
      <WholeTable {...props} />
    </AppContext.Provider>,
  );
  /* eslint-enable */
    return {
        props,
        wrapper,
    };
};

describe('WholeTable 组件', () => {
    const { wrapper } = setup();
    it('是否渲染成功 ?', () => {
        expect(wrapper.find('table').length).toBe(1);
    });
});
