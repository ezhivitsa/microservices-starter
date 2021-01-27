import React, { ReactElement, useEffect } from 'react';
import classnames from 'classnames';

import { useStyles } from '@packages/ui';
import { FrontEvents } from '@packages/common';

import { useCurrentUserStore } from 'providers';

import { Profile } from './components/profile';

import styles from './header.pcss';

interface Props {
  className?: string;
}

export function Header({ className }: Props): ReactElement {
  const currentUserStore = useCurrentUserStore();
  const b = useStyles(styles, 'header');

  useEffect(() => {
    currentUserStore.fetch();
  }, []);

  useEffect(() => {
    window.addEventListener(FrontEvents.updateCurrentUser, handleUpdateCurrentUser);

    return () => {
      window.removeEventListener(FrontEvents.updateCurrentUser, handleUpdateCurrentUser);
    };
  });

  function handleUpdateCurrentUser(): void {
    currentUserStore.fetch();
  }

  return (
    <div className={classnames(className, b())}>
      <Profile className={b('profile')} />
    </div>
  );
}
