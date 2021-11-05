import { action, runInAction, computed, makeObservable, observable } from 'mobx';

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
  firstName = '';
  lastName = '';

  fetchStatus: Types.Status = Types.Status.Initial;
  fetchError: ApiError | null = null;

  updateStatus: Types.Status = Types.Status.Initial;
  updateError: ApiError | null = null;

  constructor() {
    makeObservable(this, {
      firstName: observable,
      lastName: observable,
      fetchStatus: observable,
      fetchError: observable,
      updateStatus: observable,
      updateError: observable,
      isLoading: computed,
      formikValues: computed,
      formikErrors: computed,
      generalError: computed,
      isUpdating: computed,
      isUpdateDone: computed,
      fetch: action,
      update: action,
      dispose: action,
    });
  }

  get isLoading(): boolean {
    return this.fetchStatus === Types.Status.Initial || this.fetchStatus === Types.Status.Pending;
  }

  get formikValues(): FormikCurrentUser {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
    };
  }

  get formikErrors(): Partial<FormikCurrentUser> {
    return {};
    // ToDo: fix error
    // return this.updateStatus === Types.Status.Error ? this.updateError?.joiErrors || {} : {};
  }

  get generalError(): string | undefined {
    return this.updateStatus === Types.Status.Error ? this.updateError?.error?.message : undefined;
  }

  get isUpdating(): boolean {
    return this.updateStatus === Types.Status.Pending;
  }

  get isUpdateDone(): boolean {
    return this.updateStatus === Types.Status.Done;
  }

  async fetch(): Promise<void> {
    this.fetchStatus = Types.Status.Pending;
    this.fetchError = null;

    try {
      const currentUser = await UsersService.getCurrentUser();

      runInAction(() => {
        this.fetchStatus = Types.Status.Done;
        this.firstName = currentUser.firstName || '';
        this.lastName = currentUser.lastName;
      });
    } catch (error) {
      runInAction(() => {
        this.fetchStatus = Types.Status.Error;
        this.fetchError = error as ApiError;
      });
    }
  }

  async update(values: FormikCurrentUser): Promise<void> {
    this.updateStatus = Types.Status.Pending;
    this.updateError = null;

    this.firstName = values.firstName;
    this.lastName = values.lastName;

    try {
      await UsersService.updateCurrentUser({
        firstName: values.firstName || undefined,
        lastName: values.lastName,
      });

      runInAction(() => {
        this.updateStatus = Types.Status.Done;
      });
    } catch (error) {
      runInAction(() => {
        this.updateStatus = Types.Status.Error;
        this.updateError = error as ApiError;
      });
    }
  }

  dispose(): void {
    this.fetchStatus = Types.Status.Initial;
    this.fetchError = null;

    this.updateStatus = Types.Status.Initial;
    this.updateError = null;
  }
}
