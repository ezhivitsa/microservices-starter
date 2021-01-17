import React, { ReactElement, useEffect } from 'react';
import classnames from 'classnames';

import { useStyles } from '@packages/ui';

import { CurrentUserStoreProvider, useCurrentUserStore, useCreateCurrentUserStore } from 'providers';

import { Profile } from './components/profile';

import styles from './header.pcss';

interface Props {
  className?: string;
}

function HeaderComponent({ className }: Props): ReactElement {
  const currentUserStore = useCurrentUserStore();
  const b = useStyles(styles, 'header');

  useEffect(() => {
    currentUserStore.fetch();
  }, []);

  return (
    <div className={classnames(className, b())}>
      <Profile className={b('profile')} />
    </div>
  );
}

export function Header(props: Props): ReactElement {
  const currentUserStore = useCreateCurrentUserStore();

  return (
    <CurrentUserStoreProvider value={currentUserStore}>
      <HeaderComponent {...props} />
    </CurrentUserStoreProvider>
  );
}
