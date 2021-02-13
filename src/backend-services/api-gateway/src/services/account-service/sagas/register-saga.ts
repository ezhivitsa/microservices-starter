import { Saga, CommandMetadata } from '@packages/communication';

import { AuthProvider, AuthProviderTypes, UsersProvider, EmailProvider } from 'providers';

import { RegisterParams } from '../types';

export class RegisterSagaState {
  private _authData?: AuthProviderTypes.RegisterResult;

  constructor(private _data: RegisterParams) {}

  get token(): string {
    return this._authData?.signupToken || '';
  }

  authRegister = async (metadata: CommandMetadata): Promise<void> => {
    const authData = await AuthProvider.register(this._data, metadata);
    this._authData = authData || undefined;
  };

  cancelAuthRegister = async (metadata: CommandMetadata): Promise<void> => {
    const id = this._authData?.id;
    if (id) {
      await AuthProvider.cancelRegister({ id }, metadata);
    }
  };

  usersRegister = async (metadata: CommandMetadata): Promise<void> => {
    const authData = this._authData;

    if (!authData) {
      return;
    }

    const { id: authId } = authData;

    await UsersProvider.register(
      {
        authId,
        ...this._data,
      },
      metadata,
    );
  };

  sendSignupEmail = async (metadata: CommandMetadata): Promise<void> => {
    const token = this._authData?.signupToken;

    if (!token) {
      return;
    }

    await EmailProvider.sendVerifyEmail(
      {
        firstName: this._data.firstName,
        lastName: this._data.lastName,
        email: this._data.email,
        token,
      },
      metadata,
    );
  };
}

export class RegisterSaga extends Saga {
  constructor(state: RegisterSagaState) {
    super();

    this._sagaDefinition = this.step()
      .invokeParticipant(state.authRegister)
      .withCompensation(state.cancelAuthRegister)

      .step()
      .invokeParticipant(state.usersRegister)

      .step()
      .invokeParticipant(state.sendSignupEmail)

      .build();
  }
}
