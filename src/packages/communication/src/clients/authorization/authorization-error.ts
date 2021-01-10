import { AuthorizationTypes, CommonTypes } from '../../proto-messages';

export class AuthorizationError extends Error {
  readonly code?: AuthorizationTypes.ErrorCode;
  readonly joiErrors?: CommonTypes.JoiError[];

  constructor(data: AuthorizationTypes.Error) {
    super(data.message || '');

    this.code = data.code;
    this.joiErrors = data.joiErrors;

    // Explicit setting of prototype due to features
    // of work built in class Error in TS/ES6
    Object.setPrototypeOf(this, AuthorizationError.prototype);
  }
}
