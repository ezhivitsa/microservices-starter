import { logLevel } from '@packages/communication';

import { DEFAULT_PORT } from '../utils';
import { Config } from '../types';

export const production: Config = {
  port: DEFAULT_PORT,
  logger: {
    level: 'info',
    format: 'cloud',
  },
  requestIdHeader: 'x-request-id',
  kafka: {
    clientId: 'users',
    brokers: ['kafka:9092'],
    logLevel: logLevel.INFO,
  },
  kafkaConsumer: {
    groupId: 'users',
  },
  kafkaMock: false,
  logServiceErrors: false,
};
