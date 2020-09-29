export interface RegistrationRequest {
  email: string;
  firstName?: string;
  lastName: string;
}

export interface RegistrationResponse {
  accessToken: string;
}
