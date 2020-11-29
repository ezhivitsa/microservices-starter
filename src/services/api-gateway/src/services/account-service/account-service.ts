import { authorizationProvider } from 'lib/providers';

import { ServiceMetadata } from '../types';
import { RegisterRequest, RegisterResponse } from './types';

export async function register(data: RegisterRequest, metadata: ServiceMetadata): Promise<RegisterResponse> {
  return authorizationProvider.registrationCommand(data, metadata);
}
