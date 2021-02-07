import { AuthorizationClient, AuthorizationTypes, Version } from '@packages/communication';

import { kafka } from '@root/lib/kafka';

const authorizationClient = new AuthorizationClient(kafka);

const v1Metadata = {
  requestId: '1',
  version: Version.v1,
  responseChannel: 'response',
};

export function register(
  data: AuthorizationTypes.RegistrationRequest,
): Promise<AuthorizationTypes.RegistrationResponse> {
  return authorizationClient.registrationCommand(data, v1Metadata);
}

export function verifyEmail(data: AuthorizationTypes.VerifyEmailRequest): Promise<void> {
  return authorizationClient.verifyEmailCommand(data, v1Metadata);
}

export function getAccessToken(
  data: AuthorizationTypes.GetAccessTokenRequest,
): Promise<AuthorizationTypes.GetAccessTokenResponse> {
  return authorizationClient.getAccessTokenCommand(data, v1Metadata);
}

export function getForgotPasswordToken(
  data: AuthorizationTypes.GetForgotPasswordTokenRequest,
): Promise<AuthorizationTypes.GetForgotPasswordTokenResponse> {
  return authorizationClient.getForgotPasswordTokenCommand(data, v1Metadata);
}

export function getRefreshToken(
  data: AuthorizationTypes.GetRefreshTokenRequest,
): Promise<AuthorizationTypes.GetRefreshTokenResponse> {
  return authorizationClient.getRefreshTokenCommand(data, v1Metadata);
}

export function getSignupToken(
  data: AuthorizationTypes.GetSignupTokenRequest,
): Promise<AuthorizationTypes.GetSignupTokenResponse> {
  return authorizationClient.getSignupTokenCommand(data, v1Metadata);
}

export function getUser(data: AuthorizationTypes.GetUserRequest): Promise<AuthorizationTypes.GetUserResponse> {
  return authorizationClient.getUserCommand(data, v1Metadata);
}

export function resetPassword(data: AuthorizationTypes.ResetPasswordRequest): Promise<void> {
  return authorizationClient.resetPasswordCommand(data, v1Metadata);
}

export function revokeToken(data: AuthorizationTypes.RevokeTokenRequest): Promise<void> {
  return authorizationClient.revokeTokenCommand(data, v1Metadata);
}

export function saveToken(data: AuthorizationTypes.SaveTokenRequest): Promise<void> {
  return authorizationClient.saveTokenCommand(data, v1Metadata);
}

export function verifyScope(
  data: AuthorizationTypes.VerifyScopeRequest,
): Promise<AuthorizationTypes.VerifyScopeResponse> {
  return authorizationClient.verifyScopeCommand(data, v1Metadata);
}
