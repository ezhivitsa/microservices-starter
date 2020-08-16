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
    dashboard: `http://localhost:8081`,
    calendar: 'http://localhost:8082',
  },
};
