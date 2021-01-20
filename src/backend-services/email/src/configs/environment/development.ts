import { resolve } from 'path';

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
  email: {
    ...staging.email,
    isSendEmail: false,
    savedEmailHtmlPath: resolve(__dirname, '../../../resources/sent'),
  },
  apiGatewayUrl: 'http://localhost:8090/api',
};
