import { EmailTypes, CommonTypes } from '../../proto-messages';

export class EmailError extends Error {
  readonly code?: EmailTypes.ErrorCode;
  readonly joiErrors?: CommonTypes.JoiError[];

  constructor(data: EmailTypes.Error) {
    super(data.message || '');

    this.code = data.code;
    this.joiErrors = data.joiErrors;

    // Explicit setting of prototype due to features
    // of work built in class Error in TS/ES6
    Object.setPrototypeOf(this, EmailError.prototype);
  }
}
