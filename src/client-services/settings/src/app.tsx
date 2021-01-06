import React, { ReactElement, StrictMode } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';

import { config } from 'lib/config';

import { ProfilePage } from './components/pages';
import { profilePath, indexPath } from './components/pages/paths';

function AppComponent(): ReactElement {
  return (
    <StrictMode>
      <BrowserRouter basename={config.frontUpstreams.settings.rule}>
        <Switch>
          <Route exact path={indexPath}>
            <Redirect to={profilePath} />
          </Route>
          <Route path={profilePath} component={ProfilePage} />
        </Switch>
      </BrowserRouter>
    </StrictMode>
  );
}

export const App = hot(AppComponent);
