import { authorizationClient } from 'lib/clients';

import { ServiceMetadata } from '../types';
import { RegisterRequest, GetAccessTokenRequest, GetAccessTokenResponse } from './types';

export function register(data: RegisterRequest, metadata: ServiceMetadata): Promise<void> {
  return authorizationClient.registrationCommand(data, metadata);
}

export function getAccessToken(data: GetAccessTokenRequest, metadata: ServiceMetadata): Promise<void> {
  return authorizationClient.registrationCommand(data, metadata);
}
