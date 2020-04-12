import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, RenderResult } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import LinkToMap from '../../src/client/components/LinkToMap';

let wrapper: RenderResult;
describe('LinkToMap 组件', () => {
  beforeEach(() => {
    wrapper = render(
      <BrowserRouter>
        <LinkToMap name="保利天空之城" />
      </BrowserRouter>
    );
  });

  it('是否渲染成功 ?', () => {
    expect(wrapper.getByText('保利天空之城')).toBeInTheDocument();
  });
});
