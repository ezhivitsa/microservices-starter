import { DEFAULT_PORT, HTTPS } from '../utils';

import { Config } from '../types';

export const production: Config = {
  port: DEFAULT_PORT,
  useHttps: HTTPS,
  logger: {
    level: 'info',
    format: 'cloud',
  },
  requestIdHeader: 'x-request-id',
};
