import { lib } from '@packages/client';

import { errors } from 'texts';

export const api = lib.initApi({ apiUrl: lib.config.apiGatewayUrl, globalError: errors.general });
