import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, RenderResult } from '@testing-library/react';
import Loading from '../../src/client/components/Loading';

const props = {
  tip: 'test',
};

let wrapper: RenderResult;
describe('Loading 组件', () => {
  beforeEach(() => {
    wrapper = render(<Loading {...props} />);
  });

  it('是否存在根元素?', () => {
    expect(
      wrapper.container.querySelector('.common-loading')
    ).toBeInTheDocument();
  });

  it('是否渲染 tip 成功 ?', () => {
    expect(
      wrapper.container.querySelector('.common-loading')
    ).toBeInTheDocument();
    expect(wrapper.getByText('test')).toBeInTheDocument();
    expect(wrapper.container.querySelector('.ant-spin-text')?.textContent).toBe(
      props.tip
    );
  });
});
