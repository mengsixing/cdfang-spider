import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import { observable } from 'mobx';
import { Provider } from 'mobx-react';

//定义全局状态,注入根主键
var appState = observable({
	allData: [],
	activityKey: 6
});

ReactDOM.render(
	<Provider appState={appState}>
		<App />
	</Provider>,
	document.getElementById('root')
);
