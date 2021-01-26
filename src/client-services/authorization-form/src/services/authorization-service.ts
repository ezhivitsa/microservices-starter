import { ServiceTypes, Constants } from '@packages/common';

import { api } from './api';

const { versionV1, authorizationPrefix, signinPath, signupPath, verifyEmailPath, resendVerifyEmailPath } = Constants;

export function signIn(data: ServiceTypes.SignInRequest): Promise<void> {
  return api.post(`${versionV1}${authorizationPrefix}${signinPath}`, data);
}

export function signUp(data: ServiceTypes.SignUpRequest): Promise<ServiceTypes.SignUpResponse> {
  return api.post(`${versionV1}${authorizationPrefix}${signupPath}`, data);
}

export function verifyEmail(data: ServiceTypes.VerifyEmailRequest): Promise<void> {
  return api.post(`${versionV1}${authorizationPrefix}${verifyEmailPath}`, data);
}

export function resendVerifyEmail(data: ServiceTypes.ResendVerifyEmail): Promise<void> {
  return api.post(`${versionV1}${authorizationPrefix}${resendVerifyEmailPath}`, data);
}
