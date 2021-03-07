import { CommandUserRole, ClientCommandMetadata } from '@packages/communication';

import { AuthProviderTypes, ProviderTypes } from 'providers';

export const mapUserRoleToProto: Record<AuthProviderTypes.UserRole, CommandUserRole> = {
  [AuthProviderTypes.UserRole.User]: CommandUserRole.User,
  [AuthProviderTypes.UserRole.Admin]: CommandUserRole.Admin,
  [AuthProviderTypes.UserRole.OrganizationAdmin]: CommandUserRole.OrganizationAdmin,
};

export function mapMetadataToProto(meta: ProviderTypes.Metadata): ClientCommandMetadata {
  const { requestId, user } = meta;

  return {
    requestId,
    user: user
      ? {
          id: user.id,
          roles: user.roles.map((role) => mapUserRoleToProto[role]),
        }
      : undefined,
  };
}
