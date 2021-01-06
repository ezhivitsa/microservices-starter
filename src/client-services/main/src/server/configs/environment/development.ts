import { Types } from '@packages/common';

import { Config } from '../types';

import { staging } from './staging';

export const development: Config = {
  ...staging,
  staticUrl: '',
  logger: {
    ...staging.logger,
    format: 'local',
  },
  featureFlagsDefault: [Types.FeatureFlag.Debug],
  enableHotLoader: true,
  frontUpstreams: {
    dashboard: {
      ...staging.frontUpstreams.dashboard,
      jsUrl: 'http://localhost:8081/bundle.js',
      cssUrl: undefined,
    },
    auth: {
      ...staging.frontUpstreams.auth,
      jsUrl: 'http://localhost:8082/bundle.js',
      cssUrl: undefined,
    },
    settings: {
      ...staging.frontUpstreams.auth,
      jsUrl: 'http://localhost:8083/bundle.js',
      cssUrl: undefined,
    },
  },
  apiGatewayUrl: 'http://localhost:8090/api',
};
