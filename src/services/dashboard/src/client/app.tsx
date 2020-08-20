import React, { ReactElement, StrictMode } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { config } from 'lib/config';

import { DashboardStoreProvider } from 'providers';
import { DashboardStore } from 'stores';

import { dashboardPathTemplate } from 'components/pages/path-templates';

import { DashboardPage } from 'components/pages';

export function App(): ReactElement {
  return (
    <StrictMode>
      <DashboardStoreProvider value={new DashboardStore()}>
        <BrowserRouter basename={config.appBasePath}>
          <Switch>
            <Route path={dashboardPathTemplate} component={DashboardPage} />
          </Switch>
        </BrowserRouter>
      </DashboardStoreProvider>
    </StrictMode>
  );
}
