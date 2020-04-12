import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, RenderResult } from '@testing-library/react';
import DoubleAxisGraph, {
  Iprops,
} from '../../src/client/components/DoubleAxisGraph';

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
describe('DoubleAxisGraph 组件', () => {
  beforeEach(() => {
    wrapper = render(<DoubleAxisGraph {...props} />);
  });

  it('是否渲染成功 ?', () => {
    expect(wrapper.container.querySelector('canvas')).toBeInTheDocument();
  });
});
