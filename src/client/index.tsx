import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Loading from './components/Loading';

const { lazy, Suspense } = React;

const App = lazy(() => import('./containers/App'));

ReactDOM.render(
    <Suspense fallback={<Loading height="100vh" tip="页面加载中..." />}>
        <App />
    </Suspense>,
    document.getElementById('root')
);
