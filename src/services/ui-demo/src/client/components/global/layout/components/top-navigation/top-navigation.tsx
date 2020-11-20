import React, { ReactElement } from 'react';
import classnames from 'classnames';

import { Heading, Toggle, ToggleSize, Theme, useTheme } from '@packages/ui';
import { lib } from '@packages/client';

import styles from './top-navigation.pcss';

interface Props {
  className?: string;
}

const b = lib.block(styles, 'top-navigation');

export function TopNavigation({ className }: Props): ReactElement {
  const [theme, changeTheme] = useTheme();

  function handleChangeTheme(isDarkTheme: boolean): void {
    changeTheme(isDarkTheme ? Theme.Dark : Theme.Light);
  }

  return (
    <div className={classnames(b(), className)}>
      <Heading className={b('heading')}>UI Components</Heading>
      <Toggle checked={theme === Theme.Dark} size={ToggleSize.L} label="Dark theme" onChange={handleChangeTheme} />
    </div>
  );
}
