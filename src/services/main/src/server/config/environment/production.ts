import {FeatureFlag} from '../../../common/feature-flags';

import {Config} from '../types';

export const production: Config = {
  logger: {
    level: 'info'
  },
  featureFlagsSupported: [
    FeatureFlag.Debug
  ],
  featureFlagsDefault: []
};
