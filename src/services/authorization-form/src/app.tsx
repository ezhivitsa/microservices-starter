import React, { ReactElement, StrictMode } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';

import { lib } from '@packages/client';

function AppComponent(): ReactElement {
  return (
    <StrictMode>
      <BrowserRouter basename={lib.config.frontUpstreams.auth.rule}>
        <Switch>
          <div>Auth</div>
        </Switch>
      </BrowserRouter>
    </StrictMode>
  );
}

export const App = hot(AppComponent);
