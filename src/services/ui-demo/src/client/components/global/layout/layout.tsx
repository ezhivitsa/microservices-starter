import React, { ReactElement, ReactNode } from 'react';

import { useMq, useStyles, Media } from '@packages/ui';

import { DesktopNavigation } from './components/desktop-navigation';
import { MobileNavigation } from './components/mobile-navigation';
import { TopNavigation } from './components/top-navigation';

import styles from './layout.pcss';

interface Props {
  children?: ReactNode;
}

export function Layout(props: Props): ReactElement {
  const isMobile = useMq(Media.SmallOnly);
  const b = useStyles(styles, 'layout');

  return (
    <div className={b()}>
      <TopNavigation className={b('header')} />

      {!isMobile && <DesktopNavigation />}
      {isMobile && <MobileNavigation />}

      <div>{props.children}</div>
    </div>
  );
}
