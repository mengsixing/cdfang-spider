// 拒绝渲染属性为空的组件
import * as React from 'react';

function RenderNoEmptyComponent(
    WrapperedComponent: React.ComponentType,
    checkProps: string[]
): React.FunctionComponent {
    function newComponent(props): JSX.Element {
        let checkValue = props;
        checkProps.forEach(item => {
            checkValue = checkValue[item];
        });
        return checkValue.length > 0 ? (
            <WrapperedComponent {...props} />
        ) : (
            <span />
        );
    }
    return newComponent;
}

export default RenderNoEmptyComponent;
