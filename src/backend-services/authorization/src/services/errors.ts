export enum ServiceErrorCode {
  Unknown = 'unknown',
  NotFound = 'not-found',
  DuplicateEmail = 'duplicate-email',
}

export class ServiceError extends Error {
  constructor(private _message: string = '', private _errorCode: ServiceErrorCode = ServiceErrorCode.Unknown) {
    super('Service error');

    // Explicit setting of prototype due to features
    // of work built in class Error in TS/ES6
    Object.setPrototypeOf(this, ServiceError.prototype);
  }

  get message(): string {
    return this._message;
  }

  get errorCode(): ServiceErrorCode {
    return this._errorCode;
  }
}

export class DuplicateEmailError extends ServiceError {
  constructor() {
    super('User with such email already exist', ServiceErrorCode.DuplicateEmail);

    Object.setPrototypeOf(this, DuplicateEmailError.prototype);
  }
}
