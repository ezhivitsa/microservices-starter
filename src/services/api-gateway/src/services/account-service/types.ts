export interface RegisterRequest {
  email: string;
  firstName?: string;
  lastName: string;
}

export interface RegisterResponse {
  accessToken: string;
}
