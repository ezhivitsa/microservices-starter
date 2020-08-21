import { FeatureFlag } from '../../../common/feature-flags';

import { version } from '../../lib/app-version';

import { DEFAULT_PORT } from '../utils';

import { Config } from '../types';

export const production: Config = {
  port: DEFAULT_PORT,
  buildPath: 'out/assets',
  staticUrl: `//microservices-starter.com/main/${version}`,
  logger: {
    level: 'info',
    format: 'cloud',
  },
  featureFlagsSupported: [FeatureFlag.Debug],
  featureFlagsDefault: [],
  enableHotLoader: false,
  requestIdHeader: 'x-request-id',
  frontUpstreams: {
    dashboard: `https://microservices-starter.com/dashboard`,
    calendar: 'https://microservices-starter.com/calendar',
  },
  frontUpstreamRules: {
    dashboard: '/dashboard',
    calendar: '/calendar',
  },
};
