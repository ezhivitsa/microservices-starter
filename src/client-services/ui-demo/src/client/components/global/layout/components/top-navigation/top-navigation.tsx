import React, { ReactElement } from 'react';

import { Heading, HeadingView, Toggle, ToggleSize, Theme, useTheme } from '@packages/ui';
import { lib } from '@packages/client';

import { layoutTexts } from 'texts';

import styles from './top-navigation.pcss';

interface Props {
  className?: string;
}

export function TopNavigation({ className }: Props): ReactElement {
  const b = lib.block(styles, 'top-navigation', undefined, className);
  const [theme, changeTheme] = useTheme();

  function handleChangeTheme(isDarkTheme: boolean): void {
    changeTheme(isDarkTheme ? Theme.Dark : Theme.Light);
  }

  return (
    <div className={b()}>
      <Heading className={b('heading')} view={HeadingView.Condensed}>
        {layoutTexts.title}
      </Heading>

      <Toggle
        checked={theme === Theme.Dark}
        size={ToggleSize.L}
        label={layoutTexts.toggleTheme}
        onChange={handleChangeTheme}
      />
    </div>
  );
}
