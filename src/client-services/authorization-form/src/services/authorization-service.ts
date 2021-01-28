import { ServiceTypes, ServerConstants } from '@packages/common';

import { api } from './api';

const {
  versionV1,
  authorizationPrefix,
  signinPath,
  signupPath,
  verifyEmailPath,
  resendVerifyEmailPath,
  forgotPasswordPath,
  resetPasswordPath,
} = ServerConstants;

export function signIn(data: ServiceTypes.SignInRequest): Promise<void> {
  return api.post(`${versionV1}${authorizationPrefix}${signinPath}`, data);
}

export function signUp(data: ServiceTypes.SignUpRequest): Promise<ServiceTypes.SignUpResponse> {
  return api.post(`${versionV1}${authorizationPrefix}${signupPath}`, data);
}

export function verifyEmail(data: ServiceTypes.VerifyEmailRequest): Promise<void> {
  return api.post(`${versionV1}${authorizationPrefix}${verifyEmailPath}`, data);
}

export function resendVerifyEmail(data: ServiceTypes.ResendVerifyEmailRequest): Promise<void> {
  return api.post(`${versionV1}${authorizationPrefix}${resendVerifyEmailPath}`, data);
}

export function forgotPassword(data: ServiceTypes.ForgotPasswordRequest): Promise<void> {
  return api.post(`${versionV1}${authorizationPrefix}${forgotPasswordPath}`, data);
}

export function resetPassword(data: ServiceTypes.ResendVerifyEmailRequest): Promise<void> {
  return api.post(`${versionV1}${authorizationPrefix}${resetPasswordPath}`, data);
}
