import { observable, computed, action, runInAction, makeObservable } from 'mobx';

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
  firstName?: string;
  lastName = '';
  email = '';
  password = '';

  status: Types.Status = Types.Status.Initial;
  error: ApiError | null = null;

  constructor() {
    makeObservable(this, {
      firstName: observable,
      lastName: observable,
      email: observable,
      password: observable,
      status: observable,
      error: observable,
      formikValues: computed,
      formikErrors: computed,
      generalError: computed,
      isSigningUp: computed,
      signUp: action,
    });
  }

  get formikValues(): FormikSignUp {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
    };
  }

  get formikErrors(): Partial<FormikSignUp> {
    return this.status === Types.Status.Error ? this.error?.data || {} : {};
  }

  get generalError(): string | undefined {
    return this.status === Types.Status.Error ? this.error?.globalError : undefined;
  }

  get isSigningUp(): boolean {
    return this.status === Types.Status.Pending;
  }

  async signUp(values: FormikSignUp): Promise<void> {
    this.status = Types.Status.Pending;
    this.error = null;

    try {
      const response = await AuthorizationService.signUp({
        ...values,
        firstName: values.firstName || undefined,
      });
    } catch (error) {
      runInAction(() => {
        this.status = Types.Status.Error;
        this.error = error;
      });
    }
  }
}
