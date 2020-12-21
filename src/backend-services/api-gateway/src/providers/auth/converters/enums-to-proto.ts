import { AuthorizationTypes } from '@packages/communication';

import { UserRole } from '../types';

export const mapUserRoleToProto: Record<UserRole, AuthorizationTypes.Role> = {
  [UserRole.User]: AuthorizationTypes.Role.USER,
  [UserRole.Admin]: AuthorizationTypes.Role.ADMIN,
  [UserRole.OrganizationAdmin]: AuthorizationTypes.Role.ORGANIZATION_ADMIN,
};
