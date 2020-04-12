import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, RenderResult } from '@testing-library/react';

import Rank, { Iprops } from '../../src/client/components/Rank';

const props: Iprops = {
  title: '2018年06月',
  unit: '套',
  data: [
    {
      _id: '',
      name: '融创香璟台西苑',
      number: 56,
    },
  ],
};

let wrapper: RenderResult;
describe('Rank 组件', () => {
  beforeEach(() => {
    wrapper = render(<Rank {...props} />);
  });
  it('title 是否正确 ?', () => {
    expect(wrapper.container.querySelector('.rank-title')?.textContent).toBe(
      `排名：${props.title}`
    );
  });
  it('渲染列表是否正确 ?', () => {
    expect(wrapper.container.querySelectorAll('.rank-list>li').length).toBe(
      props.data.length
    );
  });
});
