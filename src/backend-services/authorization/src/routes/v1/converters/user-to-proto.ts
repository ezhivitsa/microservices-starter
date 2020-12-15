import { AuthorizationTypes } from '@packages/communication';

import { User } from 'services/auth/types';

import { mapUserRoleToProto } from './enums-to-proto';

export function mapUserToProto(user: User): AuthorizationTypes.User {
  const { email, id, roles } = user;

  return {
    email,
    id,
    roles: roles.map((role) => mapUserRoleToProto[role]),
  };
}
