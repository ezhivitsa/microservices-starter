import React, { ReactElement, StrictMode } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';

import { config } from 'lib/config';

import { componentsPathTemplate, componentPathTemplate } from 'components/pages/path-templates';
import { formatComponentPath } from 'components/pages/paths';

import { DemoComponentPage } from 'components/pages/demo-component';
import { Layout } from 'components/global/layout';

export function AppComponent(): ReactElement {
  const [firstComponent] = config.components;

  return (
    <StrictMode>
      <BrowserRouter>
        <Switch>
          {firstComponent && (
            <Route exact path={componentsPathTemplate}>
              <Redirect to={formatComponentPath(firstComponent)} />
            </Route>
          )}

          <Route path={componentPathTemplate}>
            <Layout>
              <DemoComponentPage />
            </Layout>
          </Route>
        </Switch>
      </BrowserRouter>
    </StrictMode>
  );
}

export const App = hot(AppComponent);
