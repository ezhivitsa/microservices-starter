import { ErrorData, ErrorCode } from '../proto-messages';

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
  private _errorData: ErrorData;

  constructor(errorData: ErrorData = {}) {
    super(KAFKA_HANDLER_ERROR);

    this._errorData = {
      code: errorData.code || ErrorCode.UNKNOWN,
      message: errorData.message,
    };

    // Explicit setting of prototype due to features
    // of work built in class Error in TS/ES6
    Object.setPrototypeOf(this, KafkaHandlerError.prototype);
  }

  get errorData(): ErrorData {
    return this._errorData;
  }
}
