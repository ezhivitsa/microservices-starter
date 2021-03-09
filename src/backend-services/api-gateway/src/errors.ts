import { Errors } from '@packages/common';

export class ApiError extends Error {
  constructor(private _type: Errors.ErrorType = Errors.CommonErrorType.General, message?: string) {
    super(message);

    // Explicit setting of prototype due to features
    // of work built in class Error in TS/ES6
    Object.setPrototypeOf(this, ApiError.prototype);
  }

  get type(): Errors.ErrorType {
    return this._type;
  }
}
