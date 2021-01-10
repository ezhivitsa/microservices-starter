export enum ServiceErrorCode {
  Unknown = 'unknown',
  NotFound = 'not-found',
  DuplicateAuthId = 'duplicate-auth-id',
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

export class DuplicateAuthIdError extends ServiceError {
  constructor() {
    super('User with such authId already exist', ServiceErrorCode.DuplicateAuthId);

    Object.setPrototypeOf(this, DuplicateAuthIdError.prototype);
  }
}

export class NotFoundError extends ServiceError {
  constructor(message: string) {
    super(message, ServiceErrorCode.NotFound);

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}
