import { AuthorizationTypes } from '@packages/communication';

import { UserRole } from '../types';

export const mapUserRoleToProto: Record<UserRole, AuthorizationTypes.Role> = {
  [UserRole.User]: AuthorizationTypes.Role.User,
  [UserRole.Admin]: AuthorizationTypes.Role.Admin,
  [UserRole.OrganizationAdmin]: AuthorizationTypes.Role.OrganizationAdmin,
};
