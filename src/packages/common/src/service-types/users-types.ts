export interface GetCurrentUserResponse {
  firstName?: string;
  lastName: string;
  email: string;
  isEmailVerified: boolean;
}

export interface UpdateCurrentUserRequest {
  firstName?: string;
  lastName: string;
}

export interface UpdateCurrentUserResponse {
  firstName?: string;
  lastName: string;
  email: string;
}
