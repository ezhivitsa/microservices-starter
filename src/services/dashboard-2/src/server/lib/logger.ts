import { createLogger } from '@packages/logger';

import { config } from './config';

export const logger = createLogger(config.logger);
