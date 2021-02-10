import { Logger } from 'winston';
import { createLogger } from '@packages/logger';

import { config } from './config';

export const logger: Logger = createLogger(config.logger);
