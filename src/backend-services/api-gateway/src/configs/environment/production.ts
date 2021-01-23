import { logLevel } from '@packages/communication';

import { DEFAULT_PORT, HTTPS } from '../utils';

import { Config } from '../types';

export const production: Config = {
  port: DEFAULT_PORT,
  useHttps: HTTPS,
  domain: 'localhost',
  logger: {
    level: 'info',
    format: 'cloud',
  },
  kafka: {
    clientId: 'api-gateway',
    brokers: ['kafka:9092'],
    logLevel: logLevel.INFO,
  },
  kafkaConsumer: {
    groupId: 'api-gateway',
  },
  tokens: {
    accessTokenLifetime: 60 * 60, // 1 hour
    refreshTokenLifetime: 60 * 60 * 24 * 7 * 2, // 2 weeks
  },
  returnSignupToken: false,
};
