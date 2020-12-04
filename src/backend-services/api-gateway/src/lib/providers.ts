import { AuthorizationProvider } from '@packages/communication';

import { kafka } from './kafka';

export const authorizationProvider = new AuthorizationProvider(kafka);
