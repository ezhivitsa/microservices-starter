import { UsersClient } from '@packages/communication';

import { kafka } from './kafka';

export const usersClient = new UsersClient(kafka);
