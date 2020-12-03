export enum ErrorCode {
  UNKNOWN = 0,
  NOT_FOUND = 1,
  BAD_PROTO = 2,
  CONFLICT = 3,
  VALIDATION_FAILED = 4,
}

export interface Error {
  code: ErrorCode;
  message: string;
}
