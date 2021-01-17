import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, RenderResult } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import HouseDetail from '../../src/client/components/HouseDetail';

let wrapper: RenderResult;
describe('HouseDetail 组件', () => {
  beforeEach(() => {
    wrapper = render(
      <BrowserRouter>
        <HouseDetail name="保利天空之城" />
      </BrowserRouter>
    );
  });

  it('是否渲染成功 ?', () => {
    expect(wrapper.getByText('保利天空之城')).toBeInTheDocument();
  });
});
