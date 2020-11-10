import { version } from 'lib/app-version';

import { DEFAULT_PORT, HTTPS } from '../utils';

import { Config } from '../types';

const staticUrl = '//microservices-starter-static.com';

export const production: Config = {
  port: DEFAULT_PORT,
  useHttps: HTTPS,
  buildPath: 'out/assets',
  staticUrl: `${staticUrl}/s3/ui-demo/${version}`,
  enableHotLoader: false,
  assets: {
    noCache: false,
  },
  apiPath: '/ui-demo/api',
};
