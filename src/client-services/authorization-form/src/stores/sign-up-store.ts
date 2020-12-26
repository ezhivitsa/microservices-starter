import { observable, computed, action, runInAction } from 'mobx';

import { ApiError } from '@packages/client';
import { Types } from '@packages/common';

import { AuthorizationService } from 'services';

export enum FormikSignUpFieldName {
  FirstName = 'firstName',
  LastName = 'lastName',
  Email = 'email',
  Password = 'password',
}

export interface FormikSignUp {
  [FormikSignUpFieldName.FirstName]?: string;
  [FormikSignUpFieldName.LastName]: string;
  [FormikSignUpFieldName.Email]: string;
  [FormikSignUpFieldName.Password]: string;
}

export class SignUpStore {
  @observable private _firstName?: string;
  @observable private _lastName = '';
  @observable private _email = '';
  @observable private _password = '';

  @observable private _status: Types.Status = Types.Status.Initial;
  @observable private _error: ApiError | null = null;

  @computed
  get formikValues(): FormikSignUp {
    return {
      firstName: this._firstName,
      lastName: this._lastName,
      email: this._email,
      password: this._password,
    };
  }

  @computed
  get formikErrors(): Partial<FormikSignUp> {
    return this._status === Types.Status.Error ? this._error?.data || {} : {};
  }

  @computed
  get generalError(): string | undefined {
    return this._status === Types.Status.Error ? this._error?.globalError : undefined;
  }

  @computed
  get isSigningUp(): boolean {
    return this._status === Types.Status.Pending;
  }

  @action
  async signUp(values: FormikSignUp): Promise<void> {
    this._status = Types.Status.Pending;

    try {
      const response = await AuthorizationService.signUp({
        ...values,
        firstName: values.firstName || undefined,
      });
    } catch (error) {
      runInAction(() => {
        this._status = Types.Status.Error;
        this._error = error;
      });
    }
  }
}
