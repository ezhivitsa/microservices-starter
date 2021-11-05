import React, { Component, ReactElement, ReactNode } from 'react';
import { BrowserRouter, NavLink, Route, RouteComponentProps, Redirect } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';

import { Types } from '@packages/common';
import { lib } from '@packages/client';

import { config } from 'lib/config';

import { CONTENT_ELEMENT_ID } from 'constants/app.constants';

import { CurrentUserStoreProvider, useCreateCurrentUserStore } from 'providers';

import { menu } from 'texts';

import { Header } from './components/header';
import { Messages } from './components/messages';

import styles from './layout.pcss';

interface NavigationLink {
  to: string;
  text: string;
}

const {
  frontUpstreams,
  frontUpstreams: { dashboard, calendar },
} = config;
const b = lib.block(styles, 'layout');

const navigationLinks: NavigationLink[] = [
  {
    to: dashboard.rule,
    text: menu.dashboard,
  },
  {
    to: calendar.rule,
    text: menu.calendar,
  },
];

function LayoutComponent({ location: { pathname } }: RouteComponentProps): ReactElement {
  const upstream = Object.values(frontUpstreams).find(({ rule }) => `${pathname}/`.startsWith(rule));
  const view = upstream ? upstream.layout : Types.ApplicationLayout.Default;
  const isDefaultLayout = view === Types.ApplicationLayout.Default;

  function renderNavigation(): ReactNode[] {
    return navigationLinks.map((link) => {
      return (
        <NavLink key={link.to} to={link.to} className={b('menuLink')} activeClassName={styles._active}>
          {link.text}
        </NavLink>
      );
    });
  }

  return (
    <div className={b({ view })}>
      {isDefaultLayout && (
        <>
          <Header className={b('header')} />
          <div className={b('menu')}>{renderNavigation()}</div>
        </>
      )}
      <div className={b('content', { view })}>
        <Messages />
        <div id={CONTENT_ELEMENT_ID} className={b('content-data')} />
      </div>
    </div>
  );
}

function LayoutRouter(): ReactElement {
  return (
    <CurrentUserStoreProvider value={useCreateCurrentUserStore()}>
      <BrowserRouter>
        <Route exact path="/">
          <Redirect to={dashboard.rule} />
        </Route>
        <Route component={LayoutComponent} />
      </BrowserRouter>
    </CurrentUserStoreProvider>
  );
}

const LayoutHot = hot(LayoutRouter);

export class Layout extends Component {
  componentDidCatch(error: Error): void {
    console.error(error);
  }

  render(): ReactNode {
    return <LayoutHot />;
  }
}
