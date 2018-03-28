import React from 'react';
import { Icon, notification } from 'antd';
import PropTypes from 'prop-types';
import config from '../config/config';


class Notice extends React.Component{
	constructor(){
		super();
		this.state={
			isLoading:false
		};
	}
	openNotification(){
		this.setState({
			isLoading:true
		});
		fetch(config.serverDomain+'/spiderPageOne').then((response)=>response.json()).then(json=>{
			notification.open({
				message: '消息提醒',
				description: `成功更新数据${json.allLength}条，新数据${json.successLength}条。`,
			});
			this.setState({
				isLoading:false
			});
			if(json.successLength>0){
				this.props.reloadData();
			}
		});
	}
	render(){
		return (
			<span  className={this.state.isLoading?'loading notice-icon':'notice-icon'}>
				<Icon type="sync" onClick={this.openNotification.bind(this)} /> 
			</span>
			
		);
	}
}

Notice.propTypes = {
	reloadData: PropTypes.func,
};

export default Notice;

