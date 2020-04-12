// 拒绝渲染属性为空的组件
import React from 'react';

interface Iprops {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
}

function RenderNoEmptyComponent(
  WrapperedComponent: Function,
  checkProps: string[]
): React.FunctionComponent {
  const newComponent: React.FunctionComponent = (props: Iprops) => {
    const hasEmpty = checkProps.some((propName) => {
      if (Array.isArray(props[propName])) {
        return props[propName].length === 0;
      }
      return !!props[propName];
    });
    return hasEmpty ? <span /> : <WrapperedComponent {...props} />;
  };
  return newComponent;
}

export default RenderNoEmptyComponent;
