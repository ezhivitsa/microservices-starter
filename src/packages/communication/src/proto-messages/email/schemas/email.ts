import * as EmailTypes from '../types';
import { root } from './root';

export const sendVerifyEmailRequest = root.loadProtoMessage<EmailTypes.SendVerifyEmailRequest>(
  'microservices_starter.email.email.SendVerifyEmailRequest',
);
