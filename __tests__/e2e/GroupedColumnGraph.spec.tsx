import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, RenderResult } from '@testing-library/react';
import GroupedColumnGraph, {
  Iprops,
} from '../../src/client/components/GroupedColumnGraph';

const props: Iprops = {
  data: [
    {
      area: '高新南区',
      beginTime: '2018-12-27 09:00:00',
      endTime: '2018-12-29 18:00:00',
      name: '融创香璟台西苑',
      number: 56,
      status: '报名结束',
      _id: '',
    },
  ],
};

let wrapper: RenderResult;
describe('GroupedColumnGraph 组件', () => {
  beforeEach(() => {
    wrapper = render(<GroupedColumnGraph {...props} />);
  });

  it('是否正确渲染', () => {
    expect(wrapper.getByText('月份统计图')).toBeInTheDocument();
    expect(wrapper.container.querySelector('canvas')).toBeInTheDocument();
  });
});
