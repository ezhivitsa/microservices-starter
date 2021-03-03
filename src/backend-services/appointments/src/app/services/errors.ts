export enum ServiceErrorCode {
  Unknown = 'unknown',
  NotFound = 'not-found',
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

export class NotFoundError extends ServiceError {
  constructor(message: string) {
    super(message, ServiceErrorCode.NotFound);

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}
