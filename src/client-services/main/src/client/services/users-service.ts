import { ServiceTypes, Constants } from '@packages/common';

import { api } from './api';

const { versionV1, usersPrefix, currentPath } = Constants;

export function getCurrentUser(): Promise<ServiceTypes.GetCurrentUserResponse> {
  return api.get(`${versionV1}${usersPrefix}${currentPath}`);
}

export function updateCurrentUser(
  data: ServiceTypes.UpdateCurrentUserRequest,
): Promise<ServiceTypes.UpdateCurrentUserResponse> {
  return api.put(`${versionV1}${usersPrefix}${currentPath}`, data);
}
