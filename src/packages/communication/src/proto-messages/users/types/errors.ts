import { CommonTypes } from '../../common';

export const enum ErrorCode {
  Unknown = 0,
  NotFound = 1,
  BadProto = 2,
  Conflict = 3,
  ValidationFailed = 4,
  DuplicateAuthId = 5,
  AccessDenied = 6,
}

export interface Error {
  code?: ErrorCode;
  message?: string;
  joiErrors?: CommonTypes.JoiError[];
}
