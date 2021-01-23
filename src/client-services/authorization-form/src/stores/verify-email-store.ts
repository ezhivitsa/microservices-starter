import { observable, computed, action, runInAction, makeObservable } from 'mobx';

import { Types } from '@packages/common';

import { AuthorizationService } from 'services';

export class VerifyEmailStore {
  status: Types.Status = Types.Status.Initial;

  constructor() {
    makeObservable(this, {
      status: observable,
      isLoading: computed,
      verify: action,
      dispose: action,
    });
  }

  get isLoading(): boolean {
    return this.status === Types.Status.Initial || this.status === Types.Status.Pending;
  }

  get isVerifyDone(): boolean {
    return this.status === Types.Status.Done;
  }

  async verify(token: string): Promise<void> {
    this.status = Types.Status.Pending;

    try {
      await AuthorizationService.verifyEmail({ token });

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
