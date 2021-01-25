import { ErrorType, CommonErrorType, AuthorizationErrorType } from '@packages/common';

import { errorsTexts } from './texts';

type PartialRecord<K extends keyof any, T> = {
  [P in K]?: T;
};

export const mapErrorToMessage: PartialRecord<ErrorType, string> = {
  [CommonErrorType.General]: errorsTexts.general,
  [AuthorizationErrorType.DuplicateEmail]: errorsTexts.duplicateEmail,
};

export const mapVerifyErrorToMessage = errorsTexts.emailNotVerified;
