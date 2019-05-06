import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Loading from './components/Loading';

const { lazy, Suspense } = React;

const App = lazy(() => import('./containers/App'));

ReactDOM.render(
  <Suspense fallback={<Loading height="100vh" tip="页面加载中..." />}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Suspense>,
  document.getElementById('root')
);
