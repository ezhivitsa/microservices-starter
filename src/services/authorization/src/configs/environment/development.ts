import { Config } from '../types';

import { staging } from './staging';

export const development: Config = {
  ...staging,
  kafka: {
    ...staging.kafka,
    brokers: ['localhost:9092'],
  },
  logger: {
    ...staging.logger,
    format: 'local',
  },
};
