import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { mount } from 'enzyme';
import LinkToMap from '../../../src/client/components/LinkToMap';

const setup = () => {
  const wrapper = mount(
    <BrowserRouter>
      <LinkToMap name="保利天空之城" />
    </BrowserRouter>
  );
  return {
    wrapper
  };
};

describe('LinkToMap 组件', () => {
  const { wrapper } = setup();

  it('是否渲染成功 ?', () => {
    expect(wrapper.exists('a')).toBe(true);
  });
});
