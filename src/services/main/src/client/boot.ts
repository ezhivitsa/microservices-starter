import { registerMicroApps, runAfterFirstMounted, setDefaultMountApp, start, initGlobalState } from 'qiankun';

import { CONTENT_ELEMENT_ID } from 'constants/app.constants';

import { renderLayout } from './components/layout';

renderLayout({ isContentLoading: true });

registerMicroApps([
  {
    name: 'dashboard',
    entry: '//localhost:8081',
    container: `#${CONTENT_ELEMENT_ID}`,
    activeRule: '/dashboard',
  },
]);
