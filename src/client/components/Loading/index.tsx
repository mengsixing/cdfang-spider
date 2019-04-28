import * as React from 'react';
import { Spin } from 'antd';
import './styles.less';

interface IProps {
    height: string;
    tip: string;
}

function Loading(props: IProps = {
    height: '50px',
    tip: ''
}) {
    const { height, tip } = props;
    return (
        <div className="myloading" style={{ lineHeight: height, height }}>
            <Spin tip={tip} />
        </div>
    );
}

export default Loading;
