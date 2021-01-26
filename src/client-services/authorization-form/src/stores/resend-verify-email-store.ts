import { makeObservable, observable, computed, action, runInAction } from 'mobx';

import { Types } from '@packages/common';

import { AuthorizationService } from 'services';

export enum FormikResendVerifyEmailFieldName {
  Email = 'email',
}

export interface FormikResendVerifyEmail {
  [FormikResendVerifyEmailFieldName.Email]: string;
}

export class ResendVerifyEmailStore {
  email = '';
  status: Types.Status = Types.Status.Initial;

  constructor() {
    makeObservable(this, {
      email: observable,
      status: observable,
      isSending: computed,
      initialValues: computed,
      setEmail: action,
      resend: action,
      dispose: action,
    });
  }

  get isSending(): boolean {
    return this.status === Types.Status.Pending;
  }

  get initialValues(): FormikResendVerifyEmail {
    return {
      email: this.email,
    };
  }

  setEmail(email: string): void {
    this.email = email;
  }

  async resend(email: string): Promise<void> {
    this.status = Types.Status.Pending;
    this.email = email;

    try {
      await AuthorizationService.resendVerifyEmail({ email });

      runInAction(() => {
        this.status = Types.Status.Done;
      });
    } catch (err) {
      runInAction(() => {
        this.status = Types.Status.Error;
      });
    }
  }

  dispose(): void {
    this.status = Types.Status.Initial;
    this.email = '';
  }
}
