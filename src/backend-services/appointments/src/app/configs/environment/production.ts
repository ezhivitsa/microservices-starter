import { logLevel } from '@packages/communication';

import { Config } from '../types';
import { DEFAULT_PORT } from '../utils';

export const production: Config = {
  port: DEFAULT_PORT,
  logger: {
    level: 'info',
    format: 'cloud',
  },
  kafka: {
    clientId: 'appointments',
    brokers: ['kafka:9092'],
    logLevel: logLevel.INFO,
  },
  kafkaConsumer: {
    groupId: 'appointments',
  },
  kafkaMock: false,
  logServiceErrors: false,
};
