import { logLevel } from '@packages/communication';

import { Config } from '../types';
import { DEFAULT_PORT } from '../utils';

export const production: Config = {
  port: DEFAULT_PORT,
  logger: {
    level: 'info',
    format: 'cloud',
  },
  requestIdHeader: 'x-request-id',
  kafka: {
    clientId: 'authorization',
    brokers: ['kafka:9092'],
    logLevel: logLevel.INFO,
  },
  kafkaConsumer: {
    groupId: 'authorization',
  },
  kafkaMock: false,
  redis: {
    host: 'localhost',
    port: 6379,
  },
  logServiceErrors: false,
};
