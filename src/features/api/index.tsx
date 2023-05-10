import React from 'react';
import CreateApiPage from './pages/createApi'
import EditApiPage from './pages/editApi'
import ShowApiPage from './pages/showApi'
import CreateApiLinkPage from './pages/createApiFromLink'
import ListApiPage from './pages/listApi'
import { Route, Switch, useRouteMatch } from 'react-router-dom';

export default function Api() {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route path={match.path} exact>
        <ListApiPage />
      </Route>

      <Route path={`${match.path}/create`}>
        <CreateApiPage />
      </Route>
      <Route path={`${match.path}/show/:apiId`}>
        <ShowApiPage />
      </Route>
      <Route path={`${match.path}/detail/:apiId`}>
        <EditApiPage />
      </Route>
      <Route path={`${match.path}/add-link`}>
        <CreateApiLinkPage />
      </Route>
    </Switch>
  );
}
