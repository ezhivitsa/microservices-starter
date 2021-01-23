import { emailClient } from 'lib/clients';

import { ProviderTypes } from 'providers';

import { VerifyEmailParams } from './types';

export function sendVerifyEmail(params: VerifyEmailParams, metadata: ProviderTypes.Metadata): Promise<void> {
  return emailClient.sendVerifyEmailCommand(params, metadata);
}
