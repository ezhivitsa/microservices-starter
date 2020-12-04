import { Config } from '../types';

import { staging } from './staging';

export const development: Config = {
  ...staging,
  staticUrl: '',
  enableHotLoader: true,
  assets: {
    ...staging.assets,
    noCache: true,
  },
  apiPath: '/api',
};
