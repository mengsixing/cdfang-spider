import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, RenderResult, fireEvent } from '@testing-library/react';

// import { GlobalWithFetchMock } from 'jest-fetch-mock';
import Notice from '../../src/client/components/Notice';

// const customGlobal: GlobalWithFetchMock = global as GlobalWithFetchMock;

let wrapper: RenderResult;
describe('Notice 组件', () => {
  beforeEach(() => {
    wrapper = render(<Notice />);
  });

  it('是否渲染成功？', () => {
    expect(wrapper.container.querySelector('notice-icon')).toBeInTheDocument();
    expect(wrapper.container.querySelector('svg')).toBeInTheDocument();
  });

  it('点击获取消息', () => {
    // customGlobal.fetch.mockResponseOnce(
    //   JSON.stringify({ data: '12345', successArray: [1, 2, 3] })
    // );
    fireEvent.click(wrapper.container);
    // wrapper.find(SyncOutlined).simulate('click');
    expect(wrapper.container.querySelector('notice-icon')).toBeInTheDocument();
  });
});
