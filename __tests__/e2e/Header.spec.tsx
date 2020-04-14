import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, RenderResult, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../../src/client/components/Header';

let wrapper: RenderResult;
describe('Header 组件', () => {
  it('是否渲染成功 ?', async () => {
    await act(async () => {
      wrapper = await render(
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      );
    });
    expect(
      wrapper.container.querySelector('.cdfang-header-item')
    ).toBeInTheDocument();
  });

  it('title是否正确 ?', async () => {
    await act(async () => {
      wrapper = await render(
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      );
    });
    expect(
      wrapper.container.querySelector('.ant-menu-item-selected')?.textContent
    ).toEqual('首页');
  });
});
