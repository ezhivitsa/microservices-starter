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

export interface ResendVerifyEmailRequest {
  email: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
}
