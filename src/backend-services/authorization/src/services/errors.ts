export enum ServiceErrorCode {
  Unknown = 'unknown',
  NotFound = 'not-found',
  DuplicateEmail = 'duplicate-email',
}

export class ServiceError extends Error {
  constructor(message = '', private _errorCode: ServiceErrorCode = ServiceErrorCode.Unknown) {
    super(message || 'Service error');

    // Explicit setting of prototype due to features
    // of work built in class Error in TS/ES6
    Object.setPrototypeOf(this, ServiceError.prototype);
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

export class NotFoundError extends ServiceError {
  constructor(message: string) {
    super(message, ServiceErrorCode.NotFound);

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}
