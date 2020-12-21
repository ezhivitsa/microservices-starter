import { AuthorizationTypes } from '@packages/communication';

import { User } from '../types';

import { mapUserRoleToClient } from './enums-to-client';

export function mapUserDataToClient(data: AuthorizationTypes.User): User {
  const { id, email, roles } = data;

  return {
    id,
    email,
    roles: roles.map((role) => mapUserRoleToClient[role]),
  };
}
