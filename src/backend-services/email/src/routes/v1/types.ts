import { EmailTypes } from '@packages/communication';

export interface SendVerifyEmailRequest extends Required<Omit<EmailTypes.SendVerifyEmailRequest, 'firstName'>> {
  firstName?: string;
}

export interface SendForgotPasswordEmailRequest
  extends Required<Omit<EmailTypes.SendForgotPasswordEmailRequest, 'firstName'>> {
  firstName?: string;
}
