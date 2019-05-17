import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import PastYear from './containers/PastYear';
import CurrentYear from './containers/CurrentYear';
import Home from './containers/Home';
import util from './utils';

// 获取年份列表
const yearList = util.getYearList();

interface Iroutes {
  path: string;
  exact?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.FunctionComponent<any>;
}

const yearRoutes = yearList.map((year, index) => ({
  path: `/${year}`,
  component: index === 0 ? CurrentYear : PastYear
}));

let routes: Iroutes[] = [
  {
    path: '/',
    exact: true,
    component: Home
  }
];

routes = routes.concat(yearRoutes);

function RouteWithSubRoutes(route: Iroutes) {
  return (
    <Route
      path={route.path}
      render={props => {
        // 中间组件，防止 router 配置 2 个相同的 compoment，切换时不会渲染。
        function NOOP() {
          return <route.component {...props} />;
        }
        return <NOOP />;
      }}
    />
  );
}

function renderRouters() {
  return (
    <Switch>
      {routes.map(route => (
        <RouteWithSubRoutes key={route.path} {...route} />
      ))}
    </Switch>
  );
}

export default renderRouters;
