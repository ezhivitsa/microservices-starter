export interface RegisterRequest {
  email: string;
  firstName?: string;
  lastName: string;
}

export interface RegisterResponse {
  accessToken: string;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignInResponse {
  accessToken: string;
}
