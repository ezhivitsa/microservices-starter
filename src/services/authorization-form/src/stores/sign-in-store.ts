import { observable, computed, action, runInAction } from 'mobx';

import { ApiError } from '@packages/client';

import { Status } from './types';

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

  @observable private _status: Status = Status.INITIAL;
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
    return this._status === Status.ERROR ? this._error?.data || {} : {};
  }

  @computed
  get generalError(): string | undefined {
    return this._status === Status.ERROR ? this._error?.globalError : undefined;
  }

  @computed
  get isSigningIn(): boolean {
    return this._status === Status.PENDING;
  }

  @action
  async signIn(values: FormikSignIn): Promise<void> {
    this._status = Status.PENDING;

    try {
    } catch (error) {
      runInAction(() => {
        this._status = Status.ERROR;
        this._error = error;
      });
    }
  }
}
