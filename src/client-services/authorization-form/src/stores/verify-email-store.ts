import { observable, computed, makeObservable } from 'mobx';

import { Types } from '@packages/common';

export class VerifyEmailStore {
  status: Types.Status = Types.Status.Initial;

  constructor() {
    makeObservable(this, {
      status: observable,
    });
  }
}
