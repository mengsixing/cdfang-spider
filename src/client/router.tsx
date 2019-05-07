import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import PastYear from './containers/PastYear';
import CurrentYear from './containers/CurrentYear';
import Home from './containers/Home';

const routes = [
  {
    path: '/',
    year: 0,
    exact: true,
    component: Home
  },
  {
    path: '/2019',
    year: 2019,
    component: CurrentYear
  },
  {
    path: '/2018',
    year: 2018,
    component: PastYear
  },
  {
    path: '/2017',
    year: 2017,
    component: PastYear
  }
];

function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      render={props => (
        <route.component {...props} year={route.year} routes={route.routes} />
      )}
    />
  );
}

function renderRouters() {
  return (
    <Switch>
      {routes.map((route, i) => (
        <RouteWithSubRoutes key={route.year} {...route} />
      ))}
    </Switch>
  );
}

export default renderRouters;
