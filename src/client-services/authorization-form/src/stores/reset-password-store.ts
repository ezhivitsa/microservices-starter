import { makeObservable, observable, computed, action, runInAction } from 'mobx';

import { Types } from '@packages/common';

import { AuthorizationService } from 'services';

export enum FormikResetPasswordFieldName {
  Password = 'password',
}

export interface FormikResetPassword {
  [FormikResetPasswordFieldName.Password]: string;
}

export class ResetPasswordStore {
  status: Types.Status = Types.Status.Initial;

  constructor() {
    makeObservable(this, {
      status: observable,
      isResetting: computed,
      reset: action,
    });
  }

  get isResetting(): boolean {
    return this.status === Types.Status.Pending;
  }

  async reset(token: string, data: FormikResetPassword): Promise<void> {
    this.status = Types.Status.Pending;

    try {
      await AuthorizationService.resetPassword({
        token,
        password: data.password,
      });

      runInAction(() => {
        this.status = Types.Status.Done;
      });
    } catch (err) {
      runInAction(() => {
        this.status = Types.Status.Error;
      });
    }
  }
}
