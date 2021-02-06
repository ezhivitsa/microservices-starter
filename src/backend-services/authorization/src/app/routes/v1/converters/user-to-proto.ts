import { AuthorizationTypes } from '@packages/communication';
import { castDateToTimestamp } from '@packages/proto';

import { User } from '@root/services/auth/types';

import { mapUserRoleToProto } from './enums-to-proto';

export function mapUserDataToProto(user: User): AuthorizationTypes.User {
  const { email, id, roles, isEmailVerified, createdAt } = user;

  return {
    email,
    id,
    roles: roles.map((role) => mapUserRoleToProto[role]),
    isEmailVerified,
    registeredAt: castDateToTimestamp(createdAt),
  };
}
