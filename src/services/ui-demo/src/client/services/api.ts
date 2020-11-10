import { lib } from '@packages/client';

import { config } from 'lib/config';

export const api = lib.initApi({ apiUrl: config.apiPath, globalError: '' });
