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

export class KafkaHandlerError<T extends Record<string, any> = Record<string, any>> extends Error {
  constructor(private _errorData: T) {
    super(KAFKA_HANDLER_ERROR);

    // Explicit setting of prototype due to features
    // of work built in class Error in TS/ES6
    Object.setPrototypeOf(this, KafkaHandlerError.prototype);
  }

  get errorData(): T {
    return this._errorData;
  }
}
