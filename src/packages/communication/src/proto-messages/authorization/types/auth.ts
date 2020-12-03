export interface RegistrationRequest {
  email: string;
  firstName?: string;
  lastName: string;
}

export interface RegistrationResponse {
  accessToken: string;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignInResponse {
  accessToken: string;
}
