import { AuthorizationErrorType } from './authorization';
import { UsersErrorType } from './users';

export type ErrorType = AuthorizationErrorType | UsersErrorType;

export interface ErrorMessage {
  message?: string;
  type: ErrorType;
}

export type ErrorData = Record<string, ErrorMessage>;

export { AuthorizationErrorType, UsersErrorType };
