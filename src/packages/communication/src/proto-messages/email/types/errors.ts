import { CommonTypes } from '../../common';

export enum ErrorCode {
  Unknown = 'unknown',
  NotFound = 'not-found',
  BadProto = 'bad-proto',
  Conflict = 'conflict',
}

export interface Error {
  code?: ErrorCode;
  message?: string;
  joiErrors?: CommonTypes.JoiError[];
}
