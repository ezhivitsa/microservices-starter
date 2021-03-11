import { AuthorizationTypes, AuthorizationCommand } from '../../proto-messages';

import { KafkaHandlerError } from '../../kafka';
import { Channel } from '../../channels';
import { Version } from '../../messages';

import { BaseClient } from '../base-client';
import { ClientCommandMetadata } from '../types';

import { AuthorizationError } from './authorization-error';

export class AuthorizationClient extends BaseClient<AuthorizationError> {
  _channel = Channel.Authorization;
  _version = Version.v1;

  _getClientError(err: Error): AuthorizationError {
    const errorData =
      err instanceof KafkaHandlerError
        ? err.errorData
        : {
            message: err.message,
          };
    return new AuthorizationError(errorData);
  }

  registrationCommand(
    data: AuthorizationTypes.RegistrationRequest,
    metadata: ClientCommandMetadata,
  ): Promise<AuthorizationTypes.RegistrationResponse> {
    return this._sendCommand(
      {
        data,
        command: AuthorizationCommand.Registration,
      },
      metadata,
    );
  }

  cancelRegistrationCommand(
    data: AuthorizationTypes.CancelRegistrationRequest,
    metadata: ClientCommandMetadata,
  ): Promise<void> {
    return this._sendCommand(
      {
        data,
        command: AuthorizationCommand.CancelRegistration,
      },
      metadata,
    );
  }

  getAccessTokenCommand(
    data: AuthorizationTypes.GetAccessTokenRequest,
    metadata: ClientCommandMetadata,
  ): Promise<AuthorizationTypes.GetAccessTokenResponse> {
    return this._sendCommand(
      {
        data,
        command: AuthorizationCommand.GetAccessToken,
      },
      metadata,
    );
  }

  getRefreshTokenCommand(
    data: AuthorizationTypes.GetRefreshTokenRequest,
    metadata: ClientCommandMetadata,
  ): Promise<AuthorizationTypes.GetRefreshTokenResponse> {
    return this._sendCommand(
      {
        data,
        command: AuthorizationCommand.GetRefreshToken,
      },
      metadata,
    );
  }

  getUserCommand(
    data: AuthorizationTypes.GetUserRequest,
    metadata: ClientCommandMetadata,
  ): Promise<AuthorizationTypes.GetUserResponse> {
    return this._sendCommand(
      {
        data,
        command: AuthorizationCommand.GetUser,
      },
      metadata,
    );
  }

  saveTokenCommand(data: AuthorizationTypes.SaveTokenRequest, metadata: ClientCommandMetadata): Promise<void> {
    return this._sendCommand(
      {
        data,
        command: AuthorizationCommand.SaveToken,
      },
      metadata,
    );
  }

  revokeTokenCommand(data: AuthorizationTypes.RevokeTokenRequest, metadata: ClientCommandMetadata): Promise<void> {
    return this._sendCommand(
      {
        data,
        command: AuthorizationCommand.RevokeToken,
      },
      metadata,
    );
  }

  verifyScopeCommand(
    data: AuthorizationTypes.VerifyScopeRequest,
    metadata: ClientCommandMetadata,
  ): Promise<AuthorizationTypes.VerifyScopeResponse> {
    return this._sendCommand(
      {
        data,
        command: AuthorizationCommand.VerifyScope,
      },
      metadata,
    );
  }

  verifyEmailCommand(data: AuthorizationTypes.VerifyEmailRequest, metadata: ClientCommandMetadata): Promise<void> {
    return this._sendCommand({ data, command: AuthorizationCommand.VerifyEmail }, metadata);
  }

  getSignupTokenCommand(
    data: AuthorizationTypes.GetSignupTokenRequest,
    metadata: ClientCommandMetadata,
  ): Promise<AuthorizationTypes.GetSignupTokenResponse> {
    return this._sendCommand(
      {
        data,
        command: AuthorizationCommand.GetSignupToken,
      },
      metadata,
    );
  }

  getForgotPasswordTokenCommand(
    data: AuthorizationTypes.GetForgotPasswordTokenRequest,
    metadata: ClientCommandMetadata,
  ): Promise<AuthorizationTypes.GetForgotPasswordTokenResponse> {
    return this._sendCommand({ data, command: AuthorizationCommand.GetForgotPasswordToken }, metadata);
  }

  resetPasswordCommand(data: AuthorizationTypes.ResetPasswordRequest, metadata: ClientCommandMetadata): Promise<void> {
    return this._sendCommand({ data, command: AuthorizationCommand.ResetPassword }, metadata);
  }
}
