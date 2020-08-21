import { registerMicroApps, setDefaultMountApp, start } from 'qiankun';

import { CONTENT_ELEMENT_ID } from 'constants/app.constants';

import { config } from 'lib/config';

import { renderLayout } from './components/layout';

renderLayout({ isContentLoading: true });

const loader = (isContentLoading: boolean): void => renderLayout({ isContentLoading });

console.log(config.frontUpstreams.dashboard);
registerMicroApps([
  {
    name: 'dashboard',
    entry: config.frontUpstreams.dashboard,
    container: `#${CONTENT_ELEMENT_ID}`,
    loader,
    activeRule: config.frontUpstreamRules.dashboard,
  },
  {
    name: 'calendar',
    entry: config.frontUpstreams.calendar,
    container: `#${CONTENT_ELEMENT_ID}`,
    loader,
    activeRule: config.frontUpstreamRules.calendar,
  },
]);

setDefaultMountApp(config.frontUpstreamRules.dashboard);

start();
