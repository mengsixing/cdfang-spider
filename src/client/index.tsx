import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Loading from './components/Loading';
import AppContextProvider from './context/appContextProvider';

const { lazy, Suspense } = React;

const App = lazy(() => import('./containers/App'));

ReactDOM.render(
  <Suspense fallback={<Loading height="100vh" tip="页面加载中..." />}>
    <AppContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppContextProvider>
  </Suspense>,
  document.getElementById('root')
);
