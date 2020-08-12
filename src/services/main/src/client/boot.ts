import { registerMicroApps, setDefaultMountApp, start } from 'qiankun';

import { CONTENT_ELEMENT_ID } from 'constants/app.constants';

import { renderLayout } from './components/layout';

renderLayout({ isContentLoading: true });

const loader = (isContentLoading: boolean): void => renderLayout({ isContentLoading });

registerMicroApps([
  {
    name: 'dashboard',
    entry: '//localhost:8081',
    container: `#${CONTENT_ELEMENT_ID}`,
    loader,
    activeRule: '/dashboard',
  },
  {
    name: 'calendar',
    entry: '//localhost:8082',
    container: `#${CONTENT_ELEMENT_ID}`,
    loader,
    activeRule: '/calendar',
  },
]);

setDefaultMountApp('/dashboard');

start();
