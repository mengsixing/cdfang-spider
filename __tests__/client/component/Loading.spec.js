import React from 'react';

import { mount } from 'enzyme';
import Loading from '../../../src/client/components/Loading';

const setup = () => {
    const props = {
        tip: 'test',
    };
    /* eslint-disable */
  const wrapper = mount(<Loading {...props} />);
  /* eslint-enable */
    return {
        props,
        wrapper,
    };
};

describe('Todo', () => {
    const { wrapper, props } = setup();

    it('是否存在跟元素 ?', () => {
        expect(wrapper.exists('.myloading')).toBe(true);
    });

    it('是否接收到正确的tip属性 ?', () => {
        expect(wrapper.find('Spin').prop('tip')).toEqual('test');
    });

    it('是否渲染tip成功 ?', () => {
        expect(wrapper.find('.ant-spin-text').text()).toBe(props.tip);
    });
});
