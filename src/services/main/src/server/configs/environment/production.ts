import { Types } from '@packages/common';

import { version, dashboardVersion } from 'lib/app-version';

import { DEFAULT_PORT } from '../utils';

import { Config } from '../types';

const staticUrl = '//microservices-starter-static.com';

export const production: Config = {
  port: DEFAULT_PORT,
  buildPath: 'out/assets',
  staticUrl: `${staticUrl}/s3/main/${version}`,
  logger: {
    level: 'info',
    format: 'cloud',
  },
  featureFlagsSupported: [Types.FeatureFlag.Debug],
  featureFlagsDefault: [],
  enableHotLoader: false,
  requestIdHeader: 'x-request-id',
  frontUpstreams: {
    dashboard: {
      name: '@services/dashboard',
      jsUrl: `${staticUrl}/s3/dashboard/${dashboardVersion}/bundle.js`,
      cssUrl: `${staticUrl}/s3/dashboard/${dashboardVersion}/style.css`,
      rule: '/dashboard',
    },
  },
};
