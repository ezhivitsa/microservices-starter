import { logLevel } from 'kafkajs';

import { Config } from '../types';

export const production: Config = {
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
  tokens: {
    accessTokenLifetime: 60 * 60, // 1 hour
    refreshTokenLifetime: 60 * 60 * 24 * 7 * 2, // 2 weeks
  },
};
