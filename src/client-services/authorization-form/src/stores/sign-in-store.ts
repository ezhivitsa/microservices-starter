import { observable, computed, action, runInAction } from 'mobx';

import { ApiError } from '@packages/client';
import { Types } from '@packages/common';

import { AuthorizationService } from 'services';

export enum FormikSignInFieldName {
  Email = 'email',
  Password = 'password',
}

export interface FormikSignIn {
  [FormikSignInFieldName.Email]: string;
  [FormikSignInFieldName.Password]: string;
}

export class SignInStore {
  @observable private _email = '';
  @observable private _password = '';

  @observable private _status: Types.Status = Types.Status.Initial;
  @observable private _error: ApiError | null = null;

  @computed
  get formikValues(): FormikSignIn {
    return {
      email: this._email,
      password: this._password,
    };
  }

  @computed
  get formikErrors(): Partial<FormikSignIn> {
    return this._status === Types.Status.Error ? this._error?.data || {} : {};
  }

  @computed
  get generalError(): string | undefined {
    return this._status === Types.Status.Error ? this._error?.globalError : undefined;
  }

  @computed
  get isSigningIn(): boolean {
    return this._status === Types.Status.Pending;
  }

  @action
  async signIn(values: FormikSignIn): Promise<void> {
    this._status = Types.Status.Pending;
    this._error = null;

    try {
      const response = await AuthorizationService.signIn(values);
    } catch (error) {
      runInAction(() => {
        this._status = Types.Status.Error;
        this._error = error;
      });
    }
  }
}
