import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, RenderResult } from '@testing-library/react';
import BasicAreaGraph, {
  Iprops,
} from '../../src/client/components/BasicAreaGraph';

const props: Iprops = {
  title: '房源数',
  data: [
    { month: '2018-08-08', 楼盘数: 8 },
    { month: '2018-08-09', 楼盘数: 9 },
    { month: '2018-08-10', 楼盘数: 10 },
  ],
};

let wrapper: RenderResult;
describe('BasicAreaGraph 组件', () => {
  beforeEach(() => {
    wrapper = render(<BasicAreaGraph {...props} />);
  });

  it('默认 title 是否正确渲染', () => {
    expect(
      wrapper.getByText(`${props.title} / 月(统计图)`)
    ).toBeInTheDocument();
  });

  it('自定义 title 是否正确渲染', () => {
    wrapper.rerender(<BasicAreaGraph {...props} title="楼盘数" />);
    expect(wrapper.getByText(`楼盘数 / 月(统计图)`)).toBeInTheDocument();
  });

  it('图表是否正确渲染', () => {
    expect(wrapper.container.querySelector('canvas')).toBeInTheDocument();
  });
});
