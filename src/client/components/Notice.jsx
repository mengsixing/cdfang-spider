import React from 'react';
import { Icon, notification } from 'antd';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import config from '../config/config';

class Notice extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
    };
    this.openNotification = this.openNotification.bind(this);
  }

  openNotification() {
    this.setState({
      isLoading: true,
    });
    fetch(`${config.serverDomain}/spiderPageOne`)
      .then(response => response.json())
      .then((json) => {
        notification.open({
          message: '消息提醒',
          description: `成功更新数据${json.allLength}条，新数据${json.successArray.length}条。`,
        });
        this.setState({
          isLoading: false,
        });
        if (json.successArray.length > 0) {
          const { appState } = this.props;
          appState.allData = appState.allData.concat(json.successArray);
        }
      });
  }

  render() {
    const { isLoading } = this.state;
    return (
      <span className={isLoading ? 'loading notice-icon' : 'notice-icon'}>
        <Icon type="sync" onClick={this.openNotification} />
      </span>
    );
  }
}

Notice.propTypes = {
  appState: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default inject('appState')(observer(Notice));
