import { logLevel } from '@packages/communication';

import { Config } from '../types';

export const production: Config = {
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
