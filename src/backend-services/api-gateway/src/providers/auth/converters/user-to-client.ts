import { AuthorizationTypes } from '@packages/communication';
import { castTimestampToDate } from '@packages/proto';

import { User, UserRole } from '../types';

import { mapUserRoleToClient } from './enums-to-client';

export function mapUserDataToClient(data: AuthorizationTypes.User): User | null {
  const { id, email, roles, isEmailVerified, registeredAt } = data;

  if (!id || !email || !roles) {
    return null;
  }

  return {
    id,
    email,
    roles: roles.map((role) => mapUserRoleToClient[role]).filter(Boolean) as UserRole[],
    isEmailVerified: isEmailVerified || false,
    registeredAt: registeredAt ? castTimestampToDate(registeredAt) : new Date(0),
  };
}
