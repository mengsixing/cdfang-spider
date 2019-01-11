// 拒绝渲染属性为空的组件
import React from 'react';

function RenderNoEmptyComponent(WrapperedComponent, checkProps) {
  return function newComponent(props) {
    let checkValue = props;
    checkProps.forEach((item) => {
      checkValue = checkValue[item];
    });
    return checkValue.length > 0 ? <WrapperedComponent {...props} /> : '';
  };
}

export default RenderNoEmptyComponent;
