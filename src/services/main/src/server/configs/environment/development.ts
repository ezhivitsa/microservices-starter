import { FeatureFlag } from '../../../common/feature-flags';

import { Config } from '../types';

import { staging } from './staging';

export const development: Config = {
  ...staging,
  staticUrl: '',
  systemjsUrl: 'https://cdn.jsdelivr.net/npm/systemjs@6.5.0/dist',
  logger: {
    ...staging.logger,
    format: 'local',
  },
  featureFlagsDefault: [FeatureFlag.Debug],
  enableHotLoader: true,
  frontUpstreams: {
    dashboard: {
      name: '@services/dashboard',
      url: 'https://unpkg.com/single-spa-welcome/dist/single-spa-welcome.js',
      rule: '/',
    },
    // dashboard: {
    //   ...staging.frontUpstreams.dashboard,
    //   url: 'http://localhost:8081',
    // },
  },
};
