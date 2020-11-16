import React, { ReactElement, ReactNode } from 'react';
import { BrowserRouter, NavLink, Route, RouteComponentProps } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';

import { Types } from '@packages/common';
import { lib } from '@packages/client';

import { config } from 'lib/config';

import { CONTENT_ELEMENT_ID } from 'constants/app.constants';

import { menu } from 'texts';

import styles from './layout.pcss';

interface NavigationLink {
  to: string;
  text: string;
}

const {
  frontUpstreams,
  frontUpstreams: { dashboard },
} = config;
const b = lib.block(styles, 'layout');

const navigationLinks: NavigationLink[] = [
  {
    to: dashboard.rule,
    text: menu.dashboard,
  },
  {
    to: '/',
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
          <div className={b('header')} />
          <div className={b('menu')}>{renderNavigation()}</div>
        </>
      )}
      <div id={CONTENT_ELEMENT_ID} className={b('content', { view })} />
    </div>
  );
}

function LayoutRouter(): ReactElement {
  return (
    <BrowserRouter>
      <Route component={LayoutComponent} />
    </BrowserRouter>
  );
}

export const Layout = hot(LayoutRouter);
