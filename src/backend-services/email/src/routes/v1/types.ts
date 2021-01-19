import { EmailTypes } from '@packages/communication';

export interface SendVerifyEmailRequest extends Required<Omit<EmailTypes.SendVerifyEmailRequest, 'firstName'>> {
  firstName?: string;
}
