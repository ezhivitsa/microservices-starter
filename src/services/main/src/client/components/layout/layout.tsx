import React, { ReactElement, ReactNode } from 'react';
import { BrowserRouter, NavLink } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';

import { Spinner } from '@packages/ui/spinner';

import { config } from 'lib/config';

import { CONTENT_ELEMENT_ID } from 'constants/app.constants';

import { menu } from 'texts';

import styles from './layout.pcss';

interface Props {
  isContentLoading: boolean;
}

interface NavigationLink {
  to: string;
  text: string;
}

const { dashboard } = config.frontUpstreams;

const navigationLinks: NavigationLink[] = [
  {
    to: dashboard.url,
    text: menu.dashboard,
  },
];

// function LayoutComponent({ isContentLoading }: Props): ReactElement {
function LayoutComponent(): ReactElement {
  function renderNavigation(): ReactNode[] {
    return navigationLinks.map((link) => {
      return (
        <NavLink key={link.to} to={link.to} className={styles.layout__menuLink} activeClassName={styles._active}>
          {link.text}
        </NavLink>
      );
    });
  }

  return (
    <BrowserRouter>
      <div className={styles.layout}>
        <div className={styles.layout__header} />
        <div className={styles.layout__menu}>{renderNavigation()}</div>
        <div className={styles.layout__content}>
          <div id={CONTENT_ELEMENT_ID} />

          {/* {isContentLoading && <Spinner mode="page" />} */}
        </div>
      </div>
    </BrowserRouter>
  );
}

export const Layout = hot(LayoutComponent);
