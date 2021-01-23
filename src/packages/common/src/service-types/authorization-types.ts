export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignUpRequest {
  firstName?: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SignUpResponse {
  signupToken?: string;
}

export interface VerifyEmailRequest {
  token: string;
}
