import {FeatureFlag} from '../../../common/feature-flags';

import {DEFAULT_PORT} from '../utils';

import {Config} from '../types';

export const production: Config = {
  port: DEFAULT_PORT,
  logger: {
    level: 'info',
    format: 'cloud'
  },
  featureFlagsSupported: [
    FeatureFlag.Debug
  ],
  featureFlagsDefault: [],
  buildPath: 'out/assets',
  enableHotLoader: false
};
