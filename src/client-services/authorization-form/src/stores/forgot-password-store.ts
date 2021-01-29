import { observable, makeObservable, action, runInAction, computed } from 'mobx';

import { Types } from '@packages/common';

import { AuthorizationService } from 'services';

export enum FormikForgotPasswordFieldName {
  Email = 'email',
}

export interface FormikForgotPassword {
  [FormikForgotPasswordFieldName.Email]: string;
}

export class ForgotPasswordStore {
  status: Types.Status = Types.Status.Initial;

  constructor() {
    makeObservable(this, {
      status: observable,
      isSending: computed,
      sendEmail: action,
      dispose: action,
    });
  }

  get isSending(): boolean {
    return this.status === Types.Status.Pending;
  }

  async sendEmail(values: FormikForgotPassword): Promise<void> {
    this.status = Types.Status.Pending;

    try {
      await AuthorizationService.forgotPassword(values);

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
  }
}
