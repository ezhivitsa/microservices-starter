import React, { ReactElement, ReactNode } from 'react';
import { BrowserRouter, NavLink, withRouter } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';

import { lib } from '@packages/client';

import { CONTENT_ELEMENT_ID } from 'constants/app.constants';

import { menu } from 'texts';

import styles from './layout.pcss';

interface NavigationLink {
  to: string;
  text: string;
}

const { dashboard } = lib.config.frontUpstreams;
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

function LayoutComponent(): ReactElement {
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
    <BrowserRouter>
      <div className={b()}>
        <div className={b('header')} />
        <div className={b('menu')}>{renderNavigation()}</div>
        <div id={CONTENT_ELEMENT_ID} className={b('content')} />
      </div>
    </BrowserRouter>
  );
}

export const Layout = hot(LayoutComponent);
