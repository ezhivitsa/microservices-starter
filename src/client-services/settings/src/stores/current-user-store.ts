import { observable, action, runInAction, computed } from 'mobx';

import { ApiError } from '@packages/client';
import { Types } from '@packages/common';

export enum FormikCurrentUserFieldName {
  FirstName = 'firstName',
  LastName = 'lastName',
}

export interface FormikCurrentUser {
  [FormikCurrentUserFieldName.FirstName]: string;
  [FormikCurrentUserFieldName.LastName]: string;
}

export class CurrentUserStore {
  @observable private _firstName = '';
  @observable private _lastName = '';

  @observable private _fetchStatus: Types.Status = Types.Status.Initial;
  @observable private _fetchError: ApiError | null = null;

  @computed
  isLoading(): boolean {
    return this._fetchStatus === Types.Status.Initial || this._fetchStatus === Types.Status.Pending;
  }

  @computed
  formikValues(): FormikCurrentUser {
    return {
      firstName: this._firstName,
      lastName: this._lastName,
    };
  }

  @action
  async fetch(): Promise<void> {
    this._fetchStatus = Types.Status.Pending;
    this._fetchError = null;

    try {
    } catch (error) {
      runInAction(() => {
        this._fetchStatus = Types.Status.Error;
        this._fetchError = error;
      });
    }
  }

  @action
  dispose(): void {
    this._fetchStatus = Types.Status.Initial;
  }
}
