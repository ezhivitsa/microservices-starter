import React, { ReactElement, StrictMode } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';

import { config } from 'lib/config';

import { CalendarPage } from './components/pages';
import { indexPath } from './components/pages/paths';

function AppComponent(): ReactElement {
  return (
    <StrictMode>
      <BrowserRouter basename={config.frontUpstreams.calendar.rule}>
        <Switch>
          <Route exact path={indexPath} component={CalendarPage} />
        </Switch>
      </BrowserRouter>
    </StrictMode>
  );
}

export const App = hot(AppComponent);
