import { action, runInAction, computed, makeObservable, observable } from 'mobx';

import { ApiError } from '@packages/client';
import { Types, ServiceTypes } from '@packages/common';

import { UsersService } from 'services';

export class UserModel {
  readonly id: string;
  readonly firstName?: string;
  readonly lastName: string;
  readonly email: string;

  constructor(data: ServiceTypes.User) {
    this.id = data.id;
    this.email = data.email;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
  }

  get fullName(): string {
    return `${this.firstName || ''} ${this.lastName}`.trim();
  }
}

export class UsersStore {
  users: UserModel[] = [];

  fetchStatus: Types.Status = Types.Status.Initial;
  fetchError: ApiError | null = null;

  constructor() {
    makeObservable(this, {
      users: observable,
      fetchStatus: observable,
      fetchError: observable,
      isLoading: computed,
      fetch: action,
      dispose: action,
    });
  }

  get isLoading(): boolean {
    return this.fetchStatus === Types.Status.Initial || this.fetchStatus === Types.Status.Pending;
  }

  async fetch(): Promise<void> {
    this.fetchStatus = Types.Status.Pending;
    this.fetchError = null;

    try {
      const { users } = await UsersService.getUsers();

      runInAction(() => {
        this.fetchStatus = Types.Status.Done;
        this.users = users.map((user) => new UserModel(user));
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

    this.users = [];
  }
}
