import React, { ReactElement, ReactNode } from 'react';

import { useMq, Media, ThemeContextProvider } from '@packages/ui';

import { config } from 'lib/config';

import { DesktopNavigation } from './components/desktop-navigation';
import { MobileNavigation } from './components/mobile-navigation';
import { TopNavigation } from './components/top-navigation';

interface Props {
  children?: ReactNode;
}

export function Layout(props: Props): ReactElement {
  const isMobile = useMq(Media.SmallOnly);

  return (
    <ThemeContextProvider>
      <div>
        <TopNavigation />

        {!isMobile && <DesktopNavigation />}
        {isMobile && <MobileNavigation />}
      </div>
    </ThemeContextProvider>
  );
}
