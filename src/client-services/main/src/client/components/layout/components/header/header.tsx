import React, { ReactElement, useEffect } from 'react';
import classnames from 'classnames';

import { useStyles } from '@packages/ui';

import { CurrentUserStoreProvider, useCurrentUserStore } from 'providers';
import { CurrentUserStore } from 'stores';

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
  return (
    <CurrentUserStoreProvider value={new CurrentUserStore()}>
      <HeaderComponent {...props} />
    </CurrentUserStoreProvider>
  );
}
