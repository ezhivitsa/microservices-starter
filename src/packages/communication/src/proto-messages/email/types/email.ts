// SendVerifyEmail
export interface SendVerifyEmailRequest {
  email?: string;
  token?: string;
  firstName?: string;
  lastName?: string;
}

// SendForgotPasswordEmail
export interface SendForgotPasswordEmailRequest {
  email?: string;
  token?: string;
  firstName?: string;
  lastName?: string;
}
