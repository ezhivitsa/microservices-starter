import { ServiceTypes, Constants } from '@packages/common';

import { api } from './api';

const { versionV1, authorizationPrefix, signinPath, signupPath } = Constants;

export function signIn(data: ServiceTypes.SignInRequest): Promise<void> {
  return api.post(`${versionV1}${authorizationPrefix}${signinPath}`, data);
}

export function signUp(data: ServiceTypes.SignUpRequest): Promise<void> {
  return api.post(`${versionV1}${authorizationPrefix}${signupPath}`, data);
}
