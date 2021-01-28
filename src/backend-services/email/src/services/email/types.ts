export interface SendVerifyEmailParams {
  email: string;
  firstName?: string;
  lastName: string;
  token: string;
}

export interface SendForgotPasswordEmailParams {
  email: string;
  firstName?: string;
  lastName: string;
  token: string;
}
