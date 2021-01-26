import React, { ReactElement, StrictMode } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';

import { config } from 'lib/config';

import {
  VerifyEmailStoreProvider,
  ResendVerifyEmailStoreProvider,
  useCreateVerifyEmailStore,
  useCreateResendVerifyEmailStore,
} from 'providers';

import { SignUpPage, SignInPage, VerifyEmailPage, ResendVerifyEmailPage } from './components/pages';
import { signinPath, signupPath, resendVerifyEmailPath, indexPath } from './components/pages/paths';
import { verifyEmailPathTemplate } from './components/pages/path-templates';

function AppComponent(): ReactElement {
  return (
    <StrictMode>
      <VerifyEmailStoreProvider value={useCreateVerifyEmailStore()}>
        <ResendVerifyEmailStoreProvider value={useCreateResendVerifyEmailStore()}>
          <BrowserRouter basename={config.frontUpstreams.auth.rule}>
            <Switch>
              <Route exact path={indexPath}>
                <Redirect to={signinPath} />
              </Route>
              <Route path={signinPath} component={SignInPage} />
              <Route path={signupPath} component={SignUpPage} />
              <Route path={verifyEmailPathTemplate} component={VerifyEmailPage} />
              <Route path={resendVerifyEmailPath} component={ResendVerifyEmailPage} />
            </Switch>
          </BrowserRouter>
        </ResendVerifyEmailStoreProvider>
      </VerifyEmailStoreProvider>
    </StrictMode>
  );
}

export const App = hot(AppComponent);
