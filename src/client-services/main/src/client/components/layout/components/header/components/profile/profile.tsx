import React, { ReactElement, ReactNode, useState } from 'react';
import { observer } from 'mobx-react-lite';
import classnames from 'classnames';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useStyles } from '@packages/ui';

import { useCurrentUserStore } from 'providers';

import styles from './profile.pcss';

interface Props {
  className?: string;
}

export const Profile = observer(({ className }: Props): ReactElement | null => {
  const currentUserStore = useCurrentUserStore();
  const b = useStyles(styles, 'profile');
  const [menuVisible, setMenuVisible] = useState(false);

  const { isLoading, fullName } = currentUserStore;

  function renderMenu(): ReactNode {}

  if (isLoading) {
    return null;
  }

  return (
    <div className={classnames(className, b())}>
      <div className={b('name-wrap')}>
        <span className={b('name')}>{fullName}</span>
        <FontAwesomeIcon icon={faChevronDown} className={b('icon')} />
      </div>

      <div className={b('menu', { visible: menuVisible })}>{renderMenu()}</div>
    </div>
  );
});
