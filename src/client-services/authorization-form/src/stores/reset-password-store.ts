import { makeObservable, observable, computed } from 'mobx';

import { Types } from '@packages/common';

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
    });
  }

  get isResetting(): boolean {
    return this.status === Types.Status.Pending;
  }
}
