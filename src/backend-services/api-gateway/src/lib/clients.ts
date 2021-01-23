import { AuthorizationClient, UsersClient, EmailClient } from '@packages/communication';

import { kafka } from './kafka';

export const authorizationClient = new AuthorizationClient(kafka);
export const usersClient = new UsersClient(kafka);
export const emailClient = new EmailClient(kafka);
