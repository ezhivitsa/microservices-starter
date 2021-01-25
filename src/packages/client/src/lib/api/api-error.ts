import { ErrorData, ErrorMessage, JoiErrorMessage } from '@packages/common';

export class ApiError extends Error {
  private _data: ErrorData;
  private _status: number;

  constructor(data: ErrorData, status: number) {
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

  get error(): ErrorMessage | undefined {
    return this._data.error;
  }

  get joiErrors(): JoiErrorMessage[] {
    return this._data.joiErrors || [];
  }
}
