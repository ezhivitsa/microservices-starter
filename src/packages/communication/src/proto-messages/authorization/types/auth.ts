export interface RegistrationRequest {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  owner: boolean;
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
