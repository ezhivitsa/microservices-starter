import { AuthProvider } from 'providers';

import { ServiceMetadata } from '../types';
import {
  RegisterParams,
  GetAccessTokenParams,
  GetAccessTokenResult,
  GetRefreshTokenParams,
  GetRefreshTokenResult,
  GetUserParams,
  GetUserResult,
  SaveTokenParams,
  RevokeTokenParams,
  VerifyScopeParams,
} from './types';

export function register(params: RegisterParams, metadata: ServiceMetadata): Promise<void> {
  // ToDo: add call of user provider
  return AuthProvider.register(params, metadata);
}

export function getAccessToken(
  params: GetAccessTokenParams,
  metadata: ServiceMetadata,
): Promise<GetAccessTokenResult | null> {
  return AuthProvider.getAccessToken(params, metadata);
}

export async function getRefreshToken(
  params: GetRefreshTokenParams,
  metadata: ServiceMetadata,
): Promise<GetRefreshTokenResult | null> {
  return AuthProvider.getRefreshToken(params, metadata);
}

export async function getUser(params: GetUserParams, metadata: ServiceMetadata): Promise<GetUserResult | null> {
  return AuthProvider.getUser(params, metadata);
}

export async function saveToken(params: SaveTokenParams, metadata: ServiceMetadata): Promise<void> {
  await AuthProvider.saveToken(params, metadata);
}

export async function revokeToken(params: RevokeTokenParams, metadata: ServiceMetadata): Promise<void> {
  await AuthProvider.revokeToken(params, metadata);
}

export async function verifyScope(params: VerifyScopeParams, metadata: ServiceMetadata): Promise<boolean> {
  return AuthProvider.verifyScope(params, metadata);
}
