export const globalErrorField = '__global';

export type ErrorDetails = Record<string, string>;

export class ApiError extends Error {
  private _data: ErrorDetails;
  private _status: number;

  constructor(data: ErrorDetails, status: number) {
    super(JSON.stringify(data));

    // Explicit setting of prototype due to features
    // of work built in class Error in TS/ES6
    Object.setPrototypeOf(this, ApiError.prototype);

    this._data = data;
    this._status = status;
  }

  get isGlobalError(): boolean {
    return !!this._data[globalErrorField];
  }

  get status(): number {
    return this._status;
  }

  get data(): ErrorDetails {
    return this._data;
  }

  get globalError(): string {
    return this.isGlobalError ? this._data[globalErrorField] : '';
  }

  getFieldError(field: string): string | undefined {
    return this._data[field];
  }
}
