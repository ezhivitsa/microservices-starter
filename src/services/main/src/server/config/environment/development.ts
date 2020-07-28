import {FeatureFlag} from '../../../common/feature-flags';

import {Config} from '../types';

import {staging} from './staging';

export const development: Config = {
    ...staging,
    featureFlagsDefault: [
      FeatureFlag.Debug
    ]
};
