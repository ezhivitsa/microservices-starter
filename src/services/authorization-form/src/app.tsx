import React, { ReactElement, StrictMode } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';

import { lib } from '@packages/client';

import { SignUpPage, SignInPage } from './components/pages';
import { signinPath, signupPath, indexPath } from './components/pages/paths';

function AppComponent(): ReactElement {
  return (
    <StrictMode>
      <BrowserRouter basename={lib.config.frontUpstreams.auth.rule}>
        <Switch>
          <Route exact path={indexPath}>
            <Redirect to={signinPath} />
          </Route>
          <Route path={signinPath} component={SignInPage} />
          <Route path={signupPath} component={SignUpPage} />
        </Switch>
      </BrowserRouter>
    </StrictMode>
  );
}

export const App = hot(AppComponent);
