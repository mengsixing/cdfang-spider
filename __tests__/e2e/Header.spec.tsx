import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, RenderResult } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Header from '../../src/client/components/Header';

let wrapper: RenderResult;
describe('Header 组件', () => {
  beforeEach(() => {
    wrapper = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
  });

  it('是否渲染成功 ?', () => {
    expect(
      wrapper.container.querySelector('.cdfang-header-item')
    ).toBeInTheDocument();
  });

  it('title是否正确 ?', () => {
    expect(
      wrapper.container.querySelector('.ant-menu-item-selected')?.TEXT_NODE
    ).toEqual('首页');
  });
});
