import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, RenderResult } from '@testing-library/react';
import BasicColumnGraph, {
  Iprops,
} from '../../src/client/components/BasicColumnGraph';

const props: Iprops = {
  title: '房源数排序图',
  data: [
    { 区域: '新津县', 楼盘数: 8 },
    { 区域: '金堂县', 楼盘数: 7 },
    { 区域: '双流区', 楼盘数: 7 },
  ],
  xAxis: '区域',
  yAxis: '房源',
  desc: true,
};

let wrapper: RenderResult;
describe('BasicColumnGraph 组件', () => {
  beforeEach(() => {
    wrapper = render(<BasicColumnGraph {...props} />);
  });

  it('title 是否渲染正确渲染', () => {
    expect(wrapper.getByText(props.title)).toBeInTheDocument();
  });

  it('图表是否正确渲染', () => {
    expect(wrapper.container.querySelector('canvas')).toBeInTheDocument();
  });
});
