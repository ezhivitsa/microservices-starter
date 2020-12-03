import { AuthorizationTypes, AuthorizationCommand } from '../proto-messages';

import { BaseProvider } from './base-provider';
import { CommandMetadata } from './types';

export class AuthorizationProvider extends BaseProvider {
  registrationCommand(
    data: AuthorizationTypes.RegistrationRequest,
    metadata: CommandMetadata,
  ): Promise<AuthorizationTypes.RegistrationResponse> {
    return this._kafka.sendCommand(
      {
        data,
        command: AuthorizationCommand.Registration,
      },
      metadata,
    );
  }

  signInCommand(
    data: AuthorizationTypes.SignInRequest,
    metadata: CommandMetadata,
  ): Promise<AuthorizationTypes.SignInResponse> {
    return this._kafka.sendCommand(
      {
        data,
        command: AuthorizationCommand.SignIn,
      },
      metadata,
    );
  }
}
