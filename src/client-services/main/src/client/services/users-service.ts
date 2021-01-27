import { ServiceTypes, ServerConstants } from '@packages/common';

import { api } from './api';

const { versionV1, usersPrefix, currentPath, logOutPath } = ServerConstants;

export function getCurrentUser(): Promise<ServiceTypes.GetCurrentUserResponse> {
  return api.get(`${versionV1}${usersPrefix}${currentPath}`);
}

export function logOutUser(): Promise<void> {
  return api.post(`${versionV1}${usersPrefix}${logOutPath}`);
}
