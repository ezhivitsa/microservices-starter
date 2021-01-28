export interface VerifyEmailParams {
  firstName?: string;
  lastName: string;
  email: string;
  token: string;
}

export interface ForgotPasswordEmailParams {
  firstName?: string;
  lastName: string;
  email: string;
  token: string;
}
