import { ServiceTypes, ServerConstants } from '@packages/common';

import { api } from './api';

const { versionV1, usersPrefix } = ServerConstants;

export function getUsers(): Promise<ServiceTypes.GetUsersResponse> {
  return api.get(`${versionV1}${usersPrefix}`);
}
