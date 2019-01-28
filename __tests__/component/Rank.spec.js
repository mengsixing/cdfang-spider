import React from 'react';

import { mount } from 'enzyme';
import Rank from '../../src/client/components/Rank';

const setup = () => {
  const props = {
    title: '2018年06月',
    data: [
      {
        area: '高新南区',
        beginTime: '2018-12-27 09:00:00',
        endTime: '2018-12-29 18:00:00',
        name: '融创香璟台西苑',
        number: 56,
        status: '报名结束',
      },
    ],
  };
  /* eslint-disable */
  const wrapper = mount(<Rank {...props} />);
  /* eslint-enable */
  return {
    props,
    wrapper,
  };
};

describe('Rank 组件', () => {
  const { wrapper, props } = setup();
  const cheerioWrapper = wrapper.render();
  it('title 是否正确 ?', () => {
    expect(cheerioWrapper.find('.rank-title').text()).toBe(`楼盘排名：${props.title}`);
  });
  it('渲染列表是否正确 ?', () => {
    expect(cheerioWrapper.find('.rank-list>li').length).toBe(props.data.length);
  });
});
