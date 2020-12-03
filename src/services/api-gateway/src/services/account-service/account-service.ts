import { authorizationProvider } from 'lib/providers';

import { ServiceMetadata } from '../types';
import { RegisterRequest, RegisterResponse, SignInRequest, SignInResponse } from './types';

export async function register(data: RegisterRequest, metadata: ServiceMetadata): Promise<RegisterResponse> {
  return authorizationProvider.registrationCommand(data, metadata);
}

export async function signIn(data: SignInRequest, metadata: ServiceMetadata): Promise<SignInResponse> {
  return authorizationProvider.signInCommand(data, metadata);
}
