import { UserTypes, CommonTypes } from '../../proto-messages';

export class UsersError extends Error {
  readonly code?: UserTypes.ErrorCode;
  readonly joiErrors?: CommonTypes.JoiError[];

  constructor(data: UserTypes.Error) {
    super(data.message || '');

    this.code = data.code;
    this.joiErrors = data.joiErrors;

    // Explicit setting of prototype due to features
    // of work built in class Error in TS/ES6
    Object.setPrototypeOf(this, UsersError.prototype);
  }
}
