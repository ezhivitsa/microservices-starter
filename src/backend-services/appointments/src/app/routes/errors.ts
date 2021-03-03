export enum HandlerErrorCode {
  Unknown = 'unknown',
  AccessDenied = 'access-denied',
}

export class HandlerError extends Error {
  constructor(message = '', private _errorCode: HandlerErrorCode = HandlerErrorCode.Unknown) {
    super(message || 'Service error');

    // Explicit setting of prototype due to features
    // of work built in class Error in TS/ES6
    Object.setPrototypeOf(this, HandlerError.prototype);
  }

  get errorCode(): HandlerErrorCode {
    return this._errorCode;
  }
}

export class AccessDeniedError extends HandlerError {
  constructor() {
    super("User don't have access to this action", HandlerErrorCode.AccessDenied);

    Object.setPrototypeOf(this, AccessDeniedError.prototype);
  }
}
