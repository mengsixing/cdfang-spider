import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { observable } from 'mobx';
import { Provider } from 'mobx-react';
import Loading from './components/Loading';

const App = lazy(() => import('./containers/App'));

// 定义全局状态,注入根主键
const appState = observable({
  allData: [],
  activityKey: 6,
});

ReactDOM.render(
  <Provider appState={appState}>
    <Suspense fallback={<Loading height="100vh" tip="页面加载中..." />}>
      <App />
    </Suspense>
  </Provider>,
  document.getElementById('root'),
);
