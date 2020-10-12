export enum ERROR_CODE {
  UNKNOWN = 0,
  NOT_FOUND = 1,
  BAD_PROTO = 2,
  CONFLICT = 3,
  VALIDATION_FAILED = 4,
}

export interface Error {
  code: ERROR_CODE;
  message: string;
}
