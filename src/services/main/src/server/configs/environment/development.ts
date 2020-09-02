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
      ...staging.frontUpstreams.dashboard,
      url: 'http://localhost:8081/bundle.js',
    },
  },
};
