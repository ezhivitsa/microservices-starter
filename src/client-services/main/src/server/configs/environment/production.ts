import { Types } from '@packages/common';

import { version, dashboardVersion } from 'lib/app-version';

import { DEFAULT_PORT, HTTPS } from '../utils';

import { Config } from '../types';

const staticUrl = '//microservices-starter-static.com';

export const production: Config = {
  port: DEFAULT_PORT,
  useHttps: HTTPS,
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
      name: '@client-services/dashboard',
      jsUrl: `${staticUrl}/s3/dashboard/${dashboardVersion}/bundle.js`,
      cssUrl: `${staticUrl}/s3/dashboard/${dashboardVersion}/style.css`,
      rule: '/dashboard',
      layout: Types.ApplicationLayout.Default,
    },
    auth: {
      name: '@client-services/authorization-form',
      jsUrl: `${staticUrl}/s3/dashboard/${dashboardVersion}/bundle.js`,
      cssUrl: `${staticUrl}/s3/dashboard/${dashboardVersion}/style.css`,
      rule: '/auth',
      layout: Types.ApplicationLayout.Empty,
    },
  },
  apiGatewayUrl: `${staticUrl}/api`,
};
