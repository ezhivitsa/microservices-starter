import { FeatureFlag } from '../../../common/feature-flags';

import { Config } from '../types';

import { staging } from './staging';

export const development: Config = {
  ...staging,
  staticUrl: '',
  logger: {
    ...staging.logger,
    format: 'local',
  },
  featureFlagsDefault: [FeatureFlag.Debug],
  enableHotLoader: true,
  frontUpstreams: {
    dashboard: {
      ...staging.frontUpstreams.dashboard,
      url: 'http://localhost:8081',
    },
  },
};
