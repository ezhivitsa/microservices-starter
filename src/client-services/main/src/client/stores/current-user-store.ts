import { action, runInAction, computed, makeObservable, observable } from 'mobx';

import { ApiError } from '@packages/client';
import { Types } from '@packages/common';

import { UsersService } from 'services';

export class CurrentUserStore {
  firstName = '';
  lastName = '';

  fetchStatus: Types.Status = Types.Status.Initial;
  fetchError: ApiError | null = null;

  constructor() {
    makeObservable(this, {
      firstName: observable,
      lastName: observable,
      fetchStatus: observable,
      fetchError: observable,
      isLoading: computed,
      fullName: computed,
      fetch: action,
      dispose: action,
    });
  }

  get isLoading(): boolean {
    return this.fetchStatus === Types.Status.Initial || this.fetchStatus === Types.Status.Pending;
  }

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`.trim();
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
        this.fetchError = error;
      });
    }
  }

  dispose(): void {
    this.fetchStatus = Types.Status.Initial;
    this.fetchError = null;
  }
}
