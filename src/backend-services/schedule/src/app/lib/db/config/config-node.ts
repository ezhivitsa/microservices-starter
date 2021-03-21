import { getConfigs } from '@packages/postgres-storage';

import { config } from './config';

module.exports = getConfigs(config);
