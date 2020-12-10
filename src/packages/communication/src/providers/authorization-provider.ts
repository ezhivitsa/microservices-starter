import { AuthorizationTypes, AuthorizationCommand } from '../proto-messages';

import { BaseProvider } from './base-provider';
import { CommandMetadata } from './types';

export class AuthorizationProvider extends BaseProvider {
  registrationCommand(data: AuthorizationTypes.RegistrationRequest, metadata: CommandMetadata): Promise<void> {
    return this._kafka.sendCommand(
      {
        data,
        command: AuthorizationCommand.Registration,
      },
      metadata,
    );
  }

  getAccessTokenCommand(
    data: AuthorizationTypes.GetAccessTokenRequest,
    metadata: CommandMetadata,
  ): Promise<AuthorizationTypes.GetAccessTokenResponse> {
    return this._kafka.sendCommand(
      {
        data,
        command: AuthorizationCommand.GetAccessToken,
      },
      metadata,
    );
  }

  getRefreshTokenCommand(
    data: AuthorizationTypes.GetRefreshTokenRequest,
    metadata: CommandMetadata,
  ): Promise<AuthorizationTypes.GetRefreshTokenResponse> {
    return this._kafka.sendCommand(
      {
        data,
        command: AuthorizationCommand.GetRefreshToken,
      },
      metadata,
    );
  }

  getUserCommand(
    data: AuthorizationTypes.GetUserRequest,
    metadata: CommandMetadata,
  ): Promise<AuthorizationTypes.GetUserResponse> {
    return this._kafka.sendCommand(
      {
        data,
        command: AuthorizationCommand.GetUser,
      },
      metadata,
    );
  }

  saveTokenCommand(data: AuthorizationTypes.SaveTokenRequest, metadata: CommandMetadata): Promise<void> {
    return this._kafka.sendCommand(
      {
        data,
        command: AuthorizationCommand.SaveToken,
      },
      metadata,
    );
  }

  revokeTokenCommand(data: AuthorizationTypes.RevokeTokenRequest, metadata: CommandMetadata): Promise<void> {
    return this._kafka.sendCommand(
      {
        data,
        command: AuthorizationCommand.RevokeToken,
      },
      metadata,
    );
  }

  verifyScopeCommand(
    data: AuthorizationTypes.VerifyScopeRequest,
    metadata: CommandMetadata,
  ): Promise<AuthorizationTypes.VerifyScopeResponse> {
    return this._kafka.sendCommand(
      {
        data,
        command: AuthorizationCommand.VerifyScope,
      },
      metadata,
    );
  }
}
