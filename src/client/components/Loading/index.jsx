import React from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import './styles.less';

function Loading(props) {
    const { height, tip } = props;
    return (
        <div className="myloading" style={{ lineHeight: height, height }}>
            <Spin tip={tip} />
        </div>
    );
}

Loading.defaultProps = {
    height: '50px',
    tip: '',
};

Loading.propTypes = {
    height: PropTypes.string,
    tip: PropTypes.string,
};

export default Loading;
