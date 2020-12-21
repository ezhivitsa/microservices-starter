import { AuthorizationClient } from '@packages/communication';

import { kafka } from './kafka';

export const authorizationClient = new AuthorizationClient(kafka);
