import { ErrorType } from '@packages/common';

export class ApiError extends Error {
  constructor(private _type: ErrorType, private _message?: string) {
    super(_message);

    // Explicit setting of prototype due to features
    // of work built in class Error in TS/ES6
    Object.setPrototypeOf(this, ApiError.prototype);
  }

  get type(): ErrorType {
    return this._type;
  }
}
