import { lib } from '@packages/client';

import { config } from 'lib/config';

import { errorsTexts } from 'texts';

export const api = lib.initApi({ apiUrl: config.apiGatewayUrl, globalError: errorsTexts.general });
