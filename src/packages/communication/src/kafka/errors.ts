const COMMAND_TIMEOUT = 'Command timeout';
const KAFKA_HANDLER_ERROR = 'Kafka handler error';

export class KafkaCommandTimeoutError extends Error {
  constructor() {
    super(COMMAND_TIMEOUT);

    // Explicit setting of prototype due to features
    // of work built in class Error in TS/ES6
    Object.setPrototypeOf(this, KafkaCommandTimeoutError.prototype);
  }
}

export class KafkaHandlerError extends Error {
  private _errorData: any;

  constructor(errorData: any) {
    super(KAFKA_HANDLER_ERROR);

    this._errorData = errorData;

    // Explicit setting of prototype due to features
    // of work built in class Error in TS/ES6
    Object.setPrototypeOf(this, KafkaHandlerError.prototype);
  }

  get errorData(): any {
    return this._errorData;
  }
}
