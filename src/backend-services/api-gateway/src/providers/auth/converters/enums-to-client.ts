import { AuthorizationTypes } from '@packages/communication';

import { UserRole } from '../types';

export const mapUserRoleToClient: Record<AuthorizationTypes.Role, UserRole> = {
  [AuthorizationTypes.Role.USER]: UserRole.User,
  [AuthorizationTypes.Role.ADMIN]: UserRole.Admin,
  [AuthorizationTypes.Role.ORGANIZATION_ADMIN]: UserRole.OrganizationAdmin,
};
