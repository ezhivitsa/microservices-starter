import { AppointmentTypes, CommonTypes } from '../../proto-messages';

export class AppointmentsError extends Error {
  readonly code?: AppointmentTypes.ErrorCode;
  readonly joiErrors?: CommonTypes.JoiError[];

  constructor(data: AppointmentTypes.Error) {
    super(data.message || '');

    this.code = data.code;
    this.joiErrors = data.joiErrors;

    // Explicit setting of prototype due to features
    // of work built in class Error in TS/ES6
    Object.setPrototypeOf(this, AppointmentsError.prototype);
  }
}
