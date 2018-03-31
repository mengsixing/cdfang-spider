import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import { observable } from 'mobx';
import { Provider } from 'mobx-react';


//定义全局状态
var appState = observable({
	allData: []
});

ReactDOM.render(<Provider appState={appState}><App /></Provider>, document.getElementById('root'));
