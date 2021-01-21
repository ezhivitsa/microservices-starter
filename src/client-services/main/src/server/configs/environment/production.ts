import { Types, AuthPaths, DashboardPaths, SettingsPaths } from '@packages/common';

import { version, dashboardVersion, authVersion, settingsVersion } from 'lib/app-version';

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
      rule: DashboardPaths.indexPath({ fullPath: true }),
      layout: Types.ApplicationLayout.Default,
    },
    auth: {
      name: '@client-services/authorization-form',
      jsUrl: `${staticUrl}/s3/auth/${authVersion}/bundle.js`,
      cssUrl: `${staticUrl}/s3/auth/${authVersion}/style.css`,
      rule: AuthPaths.indexPath({ fullPath: true }),
      layout: Types.ApplicationLayout.Empty,
    },
    settings: {
      name: '@client-services/settings',
      jsUrl: `${staticUrl}/s3/settings/${settingsVersion}/bundle.js`,
      cssUrl: `${staticUrl}/s3/settings/${settingsVersion}/style.css`,
      rule: SettingsPaths.indexPath({ fullPath: true }),
      layout: Types.ApplicationLayout.Default,
    },
  },
  apiGatewayUrl: `${staticUrl}/api`,
};
