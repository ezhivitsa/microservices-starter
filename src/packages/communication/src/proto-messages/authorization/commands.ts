import * as AuthorizationSchemas from './schemas';

import { getChannelCommands, ChannelCommandSchema, Version } from '../../messages';
import { Channel } from '../../channels';

export enum AuthorizationCommand {
  Registration = 'registration',
  GetAccessToken = 'get-access-token',
  GetRefreshToken = 'get-refresh-token',
  GetUser = 'get-user',
  SaveToken = 'save-token',
  RevokeToken = 'revoke-token',
  VerifyScope = 'verify-scope',
  VerifyEmail = 'verify-email',
  GetSignupToken = 'get-signup-token',
  GetForgotPasswordToken = 'get-forgot-password-token',
  ResetPassword = 'reset-password',
}

export const authorizationCommandSchemas: Record<string, ChannelCommandSchema> = getChannelCommands(
  Channel.AUTHORIZATION,
  [
    {
      command: AuthorizationCommand.Registration,
      requestSchema: AuthorizationSchemas.registrationRequest,
      responseSchema: AuthorizationSchemas.registrationResponse,
    },
    {
      command: AuthorizationCommand.GetAccessToken,
      requestSchema: AuthorizationSchemas.getAccessTokenRequest,
      responseSchema: AuthorizationSchemas.getAccessTokenResponse,
    },
    {
      command: AuthorizationCommand.GetRefreshToken,
      requestSchema: AuthorizationSchemas.getRefreshTokenRequest,
      responseSchema: AuthorizationSchemas.getRefreshTokenResponse,
    },
    {
      command: AuthorizationCommand.GetUser,
      requestSchema: AuthorizationSchemas.getUserRequest,
      responseSchema: AuthorizationSchemas.getUserResponse,
    },
    { command: AuthorizationCommand.SaveToken, requestSchema: AuthorizationSchemas.saveTokenRequest },
    { command: AuthorizationCommand.RevokeToken, requestSchema: AuthorizationSchemas.revokeTokenRequest },
    {
      command: AuthorizationCommand.VerifyScope,
      requestSchema: AuthorizationSchemas.verifyScopeRequest,
      responseSchema: AuthorizationSchemas.verifyScopeResponse,
    },
    {
      command: AuthorizationCommand.VerifyEmail,
      requestSchema: AuthorizationSchemas.verifyEmailRequest,
    },
    {
      command: AuthorizationCommand.GetSignupToken,
      requestSchema: AuthorizationSchemas.getSignupTokenRequest,
      responseSchema: AuthorizationSchemas.getSignupTokenResponse,
    },
    {
      command: AuthorizationCommand.GetForgotPasswordToken,
      requestSchema: AuthorizationSchemas.getForgotPasswordTokenRequest,
      responseSchema: AuthorizationSchemas.getForgotPasswordTokenResponse,
    },
    {
      command: AuthorizationCommand.ResetPassword,
      requestSchema: AuthorizationSchemas.resetPasswordRequest,
    },
  ],
  Version.v1,
  AuthorizationSchemas.error,
);
