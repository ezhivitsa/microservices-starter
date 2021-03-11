import { ScheduleTypes, CommonTypes } from '../../proto-messages';

export class ScheduleError extends Error {
  readonly code?: ScheduleTypes.ErrorCode;
  readonly joiErrors?: CommonTypes.JoiError[];

  constructor(data: ScheduleTypes.Error) {
    super(data.message || '');

    this.code = data.code;
    this.joiErrors = data.joiErrors;

    // Explicit setting of prototype due to features
    // of work built in class Error in TS/ES6
    Object.setPrototypeOf(this, ScheduleError.prototype);
  }
}
