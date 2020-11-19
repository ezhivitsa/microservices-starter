import React, { ReactElement, ReactNode, useState } from 'react';

import { ThemeContext } from './context';
import { Theme } from './types';

interface Props {
  children: ReactNode;
}

const THEME_ITEM = 'theme';
const themesList = Object.values(Theme) as string[];

export function ThemeContextProvider(props: Props): ReactElement {
  function setTheme(type: Theme): void {
    console.log(type);
    window.localStorage?.setItem(THEME_ITEM, type);
    setStateTheme(type);
  }

  const storageTheme = window.localStorage?.getItem(THEME_ITEM);
  const initialTheme = storageTheme && themesList.includes(storageTheme) ? (storageTheme as Theme) : Theme.Light;

  const [theme, setStateTheme] = useState(initialTheme);

  return <ThemeContext.Provider value={[theme, setTheme]}>{props.children}</ThemeContext.Provider>;
}
