import { AuthorizationTypes } from '@packages/communication';

import { UserRole } from '../types';

export const mapUserRoleToClient: Record<AuthorizationTypes.Role, UserRole | undefined> = {
  [AuthorizationTypes.Role.Unknown]: undefined,
  [AuthorizationTypes.Role.User]: UserRole.User,
  [AuthorizationTypes.Role.Admin]: UserRole.Admin,
  [AuthorizationTypes.Role.OrganizationAdmin]: UserRole.OrganizationAdmin,
};
