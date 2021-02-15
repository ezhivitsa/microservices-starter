import { emailClient } from 'lib/clients';

import { ProviderTypes } from 'providers';

import { mapMetadataToProto } from '../converters';

import { VerifyEmailParams, ForgotPasswordEmailParams } from './types';

export function sendVerifyEmail(params: VerifyEmailParams, metadata: ProviderTypes.Metadata): Promise<void> {
  return emailClient.sendVerifyEmailCommand(params, mapMetadataToProto(metadata));
}

export function sendForgotPasswordEmail(
  params: ForgotPasswordEmailParams,
  metadata: ProviderTypes.Metadata,
): Promise<void> {
  return emailClient.sendForgotPasswordEmailCommand(params, mapMetadataToProto(metadata));
}
