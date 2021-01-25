import { Config } from '../types';

import { staging } from './staging';

export const development: Config = {
  ...staging,
  logger: {
    ...staging.logger,
    format: 'local',
  },
  kafka: {
    ...staging.kafka,
    brokers: ['localhost:9092'],
  },
  returnSignupToken: true,
  logErrors400: true,
};
