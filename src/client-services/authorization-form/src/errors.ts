import { Errors } from '@packages/common';

import { errorsTexts } from './texts';

type PartialRecord<K extends keyof any, T> = {
  [P in K]?: T;
};

export const mapErrorToMessage: PartialRecord<Errors.ErrorType, string> = {
  [Errors.CommonErrorType.General]: errorsTexts.general,
  [Errors.AuthorizationErrorType.DuplicateEmail]: errorsTexts.duplicateEmail,
  [Errors.AuthorizationErrorType.InvalidCredentials]: errorsTexts.invalidCredentials,
};

export const mapVerifyErrorToMessage = errorsTexts.emailNotVerified;
