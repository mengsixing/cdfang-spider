import React from 'react';

import { render } from 'enzyme';
import { Provider } from 'mobx-react';
import WholeTable from '../../src/client/components/WholeTable';

const setup = () => {
  const appState = {
    allData: [
      {
        area: '高新南区',
        beginTime: '2018-12-27 09:00:00',
        endTime: '2018-12-29 18:00:00',
        name: '融创香璟台西苑',
        number: 56,
        status: '报名结束',
      },
    ],
    activityKey: 6,
  };
  const props = {
    areaList: ['锦江区', '成华区'],
  };
  /* eslint-disable */
  const wrapper = render(
    <Provider appState={appState}>
      <WholeTable {...props} />
    </Provider>,
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
