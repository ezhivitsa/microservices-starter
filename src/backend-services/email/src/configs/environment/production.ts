import { logLevel } from '@packages/communication';

import { DEFAULT_PORT } from '../utils';
import { Config } from '../types';

const mailgunApiKey = process.env.MAILGUN_API_KEY || '';

export const production: Config = {
  port: DEFAULT_PORT,
  logger: {
    level: 'info',
    format: 'cloud',
  },
  requestIdHeader: 'x-request-id',
  kafka: {
    clientId: 'email',
    brokers: ['kafka:9092'],
    logLevel: logLevel.INFO,
  },
  kafkaConsumer: {
    groupId: 'email',
  },
  mailgun: {
    apiKey: mailgunApiKey,
    domain: 'microservices-starter.dev',
  },
  email: {
    isSendEmail: true,
  },
  webUrl: '//microservices-starter-static.com',
};
