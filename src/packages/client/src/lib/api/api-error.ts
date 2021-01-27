import { Errors } from '@packages/common';

export class ApiError extends Error {
  private _data: Errors.ErrorData;
  private _status: number;

  constructor(data: Errors.ErrorData, status: number) {
    super(JSON.stringify(data));

    // Explicit setting of prototype due to features
    // of work built in class Error in TS/ES6
    Object.setPrototypeOf(this, ApiError.prototype);

    this._data = data;
    this._status = status;
  }

  get isJoiError(): boolean {
    return !!this._data.joiErrors;
  }

  get status(): number {
    return this._status;
  }

  get error(): Errors.ErrorMessage | undefined {
    return this._data.error;
  }

  get joiErrors(): Errors.JoiErrorMessage[] {
    return this._data.joiErrors || [];
  }
}
