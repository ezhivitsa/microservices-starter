import React, { ReactElement, ReactNode, useEffect, useState, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { faChevronDown, faUserCircle, faSignOutAlt, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useStyles } from '@packages/ui';
import { SettingsPaths } from '@packages/common';

import { useCurrentUserStore } from 'providers';

import { header } from 'texts';

import styles from './profile.pcss';

interface Props {
  className?: string;
}

interface MenuItem {
  text: string;
  url?: string;
  onClick?: () => void;
  icon: IconDefinition;
  className?: string;
}

export const Profile = observer(({ className }: Props): ReactElement | null => {
  const currentUserStore = useCurrentUserStore();
  const b = useStyles(styles, 'profile');
  const [menuVisible, setMenuVisible] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const { isLoading, fullName } = currentUserStore;

  const menu: MenuItem[] = [
    {
      text: header.profile,
      url: SettingsPaths.profilePath(true),
      icon: faUserCircle,
    },
    {
      text: header.logOut,
      onClick: handleLogOutClick,
      icon: faSignOutAlt,
      className: b('log-out-item'),
    },
  ];

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  });

  function handleLogOutClick(): void {}

  function handleDocumentClick(e: MouseEvent): void {
    const el = e.target;
    const menuEl = menuRef.current;

    if (!(menuEl && el instanceof Node && menuEl.contains(el))) {
      setMenuVisible(false);
    }
  }

  function handleMenuToggle(): void {
    setMenuVisible(!menuVisible);
  }

  function renderMenuItem(item: MenuItem): ReactNode {
    const className = classnames(b('menu-item'), item.className);

    if (item.url) {
      return (
        <Link to={item.url} className={className} key={item.text}>
          <FontAwesomeIcon icon={item.icon} className={b('menu-item-icon')} />
          <span>{item.text}</span>
        </Link>
      );
    }

    return (
      <div key={item.text} className={className} onClick={item.onClick}>
        <FontAwesomeIcon icon={item.icon} className={b('menu-item-icon')} />
        <span>{item.text}</span>
      </div>
    );
  }

  if (isLoading) {
    return null;
  }

  return (
    <div className={classnames(className, b())} ref={menuRef}>
      <div className={b('name-wrap')} onClick={handleMenuToggle}>
        <span className={b('name')}>{fullName}</span>
        <FontAwesomeIcon icon={faChevronDown} className={b('icon', { expanded: menuVisible })} />
      </div>

      <div className={b('menu', { visible: menuVisible })}>{menu.map(renderMenuItem)}</div>
    </div>
  );
});
