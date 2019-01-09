import React from 'react';
import ReactDOM from 'react-dom';
import { observable } from 'mobx';
import { Provider } from 'mobx-react';
import App from './containers/App';

// 定义全局状态,注入根主键
const appState = observable({
  allData: [],
  activityKey: 6,
});

ReactDOM.render(
  <Provider appState={appState}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
