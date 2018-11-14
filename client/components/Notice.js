import React from 'react';
import { Icon, notification } from 'antd';
import PropTypes from 'prop-types';
import config from '../config/config';
import { inject, observer } from 'mobx-react';

class Notice extends React.Component {
	constructor() {
		super();
		this.state = {
			isLoading: false
		};
	}
	openNotification() {
		this.setState({
			isLoading: true
		});
		fetch(config.serverDomain + '/spiderPageOne')
			.then(response => response.json())
			.then(json => {
				notification.open({
					message: '消息提醒',
					description: `成功更新数据${json.allLength}条，新数据${
						json.successArray.length
					}条。`
				});
				this.setState({
					isLoading: false
				});
				if (json.successArray.length > 0) {
					this.props.appState.allData = this.props.appState.allData.concat(
						json.successArray
					);
				}
			});
	}
	render() {
		return (
			<span
				className={this.state.isLoading ? 'loading notice-icon' : 'notice-icon'}
			>
				<Icon type="sync" onClick={this.openNotification.bind(this)} />
			</span>
		);
	}
}

Notice.propTypes = {
	reloadData: PropTypes.func,
	appState: PropTypes.object
};

export default inject('appState')(observer(Notice));
