import { logLevel } from '@packages/communication';

import { Config } from '../types';

const staticUrl = '//microservices-starter-static.com';

export const production: Config = {
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
    apiKey: '123',
    domain: 'microservices-starter.dev',
  },
  email: {
    isSendEmail: true,
  },
  apiGatewayUrl: `${staticUrl}/api`,
};
