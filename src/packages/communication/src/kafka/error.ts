const COMMAND_TIMEOUT = 'Command timeout';

export class KafkaCommandTimeoutError extends Error {
  constructor() {
    super(COMMAND_TIMEOUT);

    // Explicit setting of prototype due to features
    // of work built in class Error in TS/ES6
    Object.setPrototypeOf(this, KafkaCommandTimeoutError.prototype);
  }
}
