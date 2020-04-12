import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, RenderResult } from '@testing-library/react';

import { AppContext, globalData } from '../../src/client/context/appContext';
import WholeTable from '../../src/client/components/WholeTable';
import { mockHouse } from '../../__mocks__/db';

const appState = {
  ...globalData,
  allData: mockHouse,
  activityKey: '高新南区',
};

let wrapper: RenderResult;
describe('WholeTable 组件', () => {
  beforeEach(() => {
    wrapper = render(
      <AppContext.Provider value={appState}>
        <WholeTable />
      </AppContext.Provider>
    );
  });
  it('是否渲染成功 ?', () => {
    expect(wrapper.container.querySelector('table')).toBeInTheDocument();
  });
});
