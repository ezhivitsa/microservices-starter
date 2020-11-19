import React, { ReactElement } from 'react';

import { Heading, Toggle, ToggleSize, Theme, useTheme } from '@packages/ui';

export function TopNavigation(): ReactElement {
  const [theme, changeTheme] = useTheme();

  function handleChangeTheme(isDarkTheme: boolean): void {
    changeTheme(isDarkTheme ? Theme.Dark : Theme.Light);
  }

  return (
    <div>
      <Heading>UI Components</Heading>
      <Toggle checked={theme === Theme.Dark} size={ToggleSize.L} label="Dark theme" onChange={handleChangeTheme} />
    </div>
  );
}
