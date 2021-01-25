import { AuthorizationErrorType } from './authorization';
import { UsersErrorType } from './users';
import { CommonErrorType } from './common';

export type ErrorType = AuthorizationErrorType | UsersErrorType | CommonErrorType;

export interface ErrorMessage {
  message?: string;
  type: ErrorType;
}

export interface JoiErrorContext {
  label?: string;
  key?: string;
}

export interface JoiErrorMessage {
  message: string;
  path: (string | number)[];
  type: string;
  context?: JoiErrorContext;
}

export interface ErrorData {
  error?: ErrorMessage;
  joiErrors?: JoiErrorMessage[];
}

export { AuthorizationErrorType, UsersErrorType, CommonErrorType };
