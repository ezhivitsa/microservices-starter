import React, { ReactElement, StrictMode } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';

import { lib } from '@packages/client';

import { DashboardStoreProvider } from 'providers';
import { DashboardStore } from 'stores';

import { dashboardPathTemplate } from 'components/pages/path-templates';

import { DashboardPage } from 'components/pages';

function AppComponent(): ReactElement {
  return (
    <StrictMode>
      <DashboardStoreProvider value={new DashboardStore()}>
        <BrowserRouter basename={lib.config.frontUpstreams.dashboard.rule}>
          <Switch>
            <Route exact path={dashboardPathTemplate} component={DashboardPage} />
          </Switch>
        </BrowserRouter>
      </DashboardStoreProvider>
    </StrictMode>
  );
}

export const App = hot(AppComponent);
