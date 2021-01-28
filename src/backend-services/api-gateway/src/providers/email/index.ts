import { emailClient } from 'lib/clients';

import { ProviderTypes } from 'providers';

import { VerifyEmailParams, ForgotPasswordEmailParams } from './types';

export function sendVerifyEmail(params: VerifyEmailParams, metadata: ProviderTypes.Metadata): Promise<void> {
  return emailClient.sendVerifyEmailCommand(params, metadata);
}

export function sendForgotPasswordEmail(
  params: ForgotPasswordEmailParams,
  metadata: ProviderTypes.Metadata,
): Promise<void> {
  return emailClient.sendForgotPasswordEmailCommand(params, metadata);
}
