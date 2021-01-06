export interface RegisterParams {
  authId: string;
  firstName?: string;
  lastName: string;
  email: string;
}

export interface GetUserByAuthIdParams {
  authId: string;
}

export interface User {
  id: string;
  firstName?: string;
  lastName: string;
  email: string;
}
