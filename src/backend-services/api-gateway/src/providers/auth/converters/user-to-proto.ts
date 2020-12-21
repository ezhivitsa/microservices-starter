import { AuthorizationTypes } from '@packages/communication';

import { User } from '../types';

import { mapUserRoleToProto } from './enums-to-proto';

export function mapUserDataToProto(data: User): AuthorizationTypes.User {
  const { id, email, roles } = data;

  return {
    id,
    email,
    roles: roles.map((role) => mapUserRoleToProto[role]),
  };
}
