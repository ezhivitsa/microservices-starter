import { AuthorizationTypes } from '@packages/communication';

import { User, UserRole } from '../types';

import { mapUserRoleToClient } from './enums-to-client';

export function mapUserDataToClient(data: AuthorizationTypes.User): User | null {
  const { id, email, roles } = data;

  if (!id || !email || !roles) {
    return null;
  }

  return {
    id,
    email,
    roles: roles.map((role) => mapUserRoleToClient[role]).filter(Boolean) as UserRole[],
  };
}
