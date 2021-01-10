import { observable, action, runInAction, computed } from 'mobx';

import { ApiError } from '@packages/client';
import { Types } from '@packages/common';

import { UsersService } from 'services';

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

  @observable private _updateStatus: Types.Status = Types.Status.Initial;
  @observable private _updateError: ApiError | null = null;

  @computed
  get isLoading(): boolean {
    return this._fetchStatus === Types.Status.Initial || this._fetchStatus === Types.Status.Pending;
  }

  @computed
  get formikValues(): FormikCurrentUser {
    return {
      firstName: this._firstName,
      lastName: this._lastName,
    };
  }

  @computed
  get formikErrors(): Partial<FormikCurrentUser> {
    return this._updateStatus === Types.Status.Error ? this._updateError?.data || {} : {};
  }

  @computed
  get generalError(): string | undefined {
    return this._updateStatus === Types.Status.Error ? this._updateError?.globalError : undefined;
  }

  @computed
  get isSigningUp(): boolean {
    return this._updateStatus === Types.Status.Pending;
  }

  @action
  async fetch(): Promise<void> {
    this._fetchStatus = Types.Status.Pending;
    this._fetchError = null;

    try {
      const currentUser = await UsersService.getCurrentUser();

      runInAction(() => {
        this._fetchStatus = Types.Status.Done;
        this._firstName = currentUser.firstName || '';
        this._lastName = currentUser.lastName;
      });
    } catch (error) {
      runInAction(() => {
        this._fetchStatus = Types.Status.Error;
        this._fetchError = error;
      });
    }
  }

  @action
  async update(values: FormikCurrentUser): Promise<void> {
    this._updateStatus = Types.Status.Pending;
    this._updateError = null;

    try {
    } catch (error) {
      runInAction(() => {
        this._updateStatus = Types.Status.Error;
        this._updateError = error;
      });
    }
  }

  @action
  dispose(): void {
    this._fetchStatus = Types.Status.Initial;
    this._fetchError = null;

    this._updateStatus = Types.Status.Initial;
    this._updateError = null;
  }
}
