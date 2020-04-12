import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, RenderResult } from '@testing-library/react';
import CricleGraph, { Iprops } from '../../src/client/components/CricleGraph';

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
  isChangeTab: false,
  changeMonth: () => {},
};

let wrapper: RenderResult;
describe('CricleGraph 组件', () => {
  beforeEach(() => {
    wrapper = render(<CricleGraph {...props} />);
  });

  it('是否渲染正确渲染', () => {
    expect(wrapper.getByText('房源分部图')).toBeInTheDocument();
    expect(wrapper.container.querySelector('canvas')).toBeInTheDocument();
  });
});
