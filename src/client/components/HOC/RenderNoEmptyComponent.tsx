// 拒绝渲染属性为空的组件
import * as React from 'react';

function RenderNoEmptyComponent(
  WrapperedComponent: Function,
  checkProps: string[]
): React.FunctionComponent {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function newComponent(props: any): JSX.Element {
    let checkValue = props;
    checkProps.forEach(item => {
      checkValue = checkValue[item];
    });
    return checkValue.length > 0 ? <WrapperedComponent {...props} /> : <span />;
  }
  return newComponent;
}

export default RenderNoEmptyComponent;
