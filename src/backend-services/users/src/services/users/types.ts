export interface RegisterParams {
  authId: string;
  email: string;
  firstName?: string;
  lastName: string;
}

export interface GetUserByAuthIdParams {
  authId: string;
}

export interface User {
  email: string;
  firstName?: string;
  lastName: string;
}

export interface UpdateUserParams {
  id: string;
  firstName?: string;
  lastName: string;
}
