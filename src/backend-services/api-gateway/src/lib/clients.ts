import { AuthorizationClient, UsersClient } from '@packages/communication';

import { kafka } from './kafka';

export const authorizationClient = new AuthorizationClient(kafka);
export const usersClient = new UsersClient(kafka);
