// 拒绝渲染属性为空的组件
import * as React from 'react';

interface Iprops {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
}

function RenderNoEmptyComponent(
  WrapperedComponent: Function,
  checkProps: string[]
): React.FunctionComponent {
  const newComponent: React.FunctionComponent = (props: Iprops) => {
    let checkValue = props;
    checkProps.forEach(item => {
      checkValue = checkValue[item];
    });
    return checkValue != null ? <WrapperedComponent {...props} /> : <span />;
  };
  return newComponent;
}

export default RenderNoEmptyComponent;
