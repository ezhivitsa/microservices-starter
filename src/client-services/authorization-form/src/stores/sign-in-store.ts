import { observable, computed, action, runInAction, makeObservable } from 'mobx';

import { ApiError } from '@packages/client';
import { Types, Errors } from '@packages/common';

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
  email = '';
  password = '';

  status: Types.Status = Types.Status.Initial;
  error: ApiError | null = null;

  constructor() {
    makeObservable(this, {
      email: observable,
      password: observable,
      status: observable,
      error: observable,
      formikValues: computed,
      generalErrorType: computed,
      isSigningIn: computed,
      signIn: action,
    });
  }

  get formikValues(): FormikSignIn {
    return {
      email: this.email,
      password: this.password,
    };
  }

  get generalErrorType(): Errors.ErrorType | undefined {
    return this.status === Types.Status.Error ? this.error?.error?.type : undefined;
  }

  get isSigningIn(): boolean {
    return this.status === Types.Status.Pending;
  }

  get isSignedIn(): boolean {
    return this.status === Types.Status.Done && this.error === null;
  }

  async signIn(values: FormikSignIn): Promise<void> {
    this.status = Types.Status.Pending;
    this.error = null;

    try {
      const response = await AuthorizationService.signIn(values);

      runInAction(() => {
        this.status = Types.Status.Done;
      });
    } catch (error) {
      runInAction(() => {
        this.status = Types.Status.Error;
        this.error = error;
      });
    }
  }
}
