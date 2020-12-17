export class ServiceError extends Error {
  constructor(private _errorData: Record<string, any> = {}) {
    super('Service error');

    // Explicit setting of prototype due to features
    // of work built in class Error in TS/ES6
    Object.setPrototypeOf(this, ServiceError.prototype);
  }

  get errorData(): Record<string, any> {
    return this._errorData;
  }
}

export class ValidationError extends ServiceError {
  constructor(errorData: Record<string, any> = {}) {
    super(errorData);

    // Explicit setting of prototype due to features
    // of work built in class Error in TS/ES6
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}
