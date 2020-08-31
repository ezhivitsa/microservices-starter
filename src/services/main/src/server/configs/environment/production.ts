import { FeatureFlag } from 'common/feature-flags';
import { FrontApplication } from 'common/general-types';

import { version, dashboardVersion } from 'lib/app-version';

import { DEFAULT_PORT } from '../utils';

import { Config } from '../types';

const staticUrl = '//microservices-starter-static.com';

export const production: Config = {
  port: DEFAULT_PORT,
  buildPath: 'out/assets',
  staticUrl: `${staticUrl}/s3/main/${version}`,
  systemjsUrl: `${staticUrl}/assets/systemjs/dist`,
  logger: {
    level: 'info',
    format: 'cloud',
  },
  featureFlagsSupported: [FeatureFlag.Debug],
  featureFlagsDefault: [],
  enableHotLoader: false,
  requestIdHeader: 'x-request-id',
  frontUpstreams: {
    dashboard: {
      name: '@services/dashboard',
      url: `${staticUrl}/s3/dashboard/${dashboardVersion}/bundle.js`,
      rule: '/dashboard',
    },
  },
};
