import { authorizationClient } from 'lib/clients';

import { ProviderTypes } from 'providers';

import {
  RegisterParams,
  RegisterResult,
  GetAccessTokenParams,
  AccessToken,
  GetRefreshTokenParams,
  RefreshToken,
  GetUserParams,
  User,
  SaveTokenParams,
  RevokeTokenParams,
  VerifyScopeParams,
  VerifyEmailParams,
  GetSignupTokenParams,
  GetSignupTokenResult,
} from './types';

import {
  mapAccessTokenDataToClient,
  mapRefreshTokenDataToClient,
  mapUserDataToClient,
  mapSaveTokenToProto,
  mapRevokeTokenToProto,
  mapVerifyScopeToProto,
} from './converters';

export async function register(
  params: RegisterParams,
  metadata: ProviderTypes.Metadata,
): Promise<RegisterResult | null> {
  const { id, signupToken } = await authorizationClient.registrationCommand(params, metadata);
  return id && signupToken ? { id, signupToken } : null;
}

export async function getAccessToken(
  params: GetAccessTokenParams,
  metadata: ProviderTypes.Metadata,
): Promise<AccessToken | null> {
  const result = await authorizationClient.getAccessTokenCommand(params, metadata);
  return mapAccessTokenDataToClient(result);
}

export async function getRefreshToken(
  params: GetRefreshTokenParams,
  metadata: ProviderTypes.Metadata,
): Promise<RefreshToken | null> {
  const result = await authorizationClient.getRefreshTokenCommand(params, metadata);
  return mapRefreshTokenDataToClient(result);
}

export async function getUser(params: GetUserParams, metadata: ProviderTypes.Metadata): Promise<User | null> {
  const { user } = await authorizationClient.getUserCommand(params, metadata);
  return user ? mapUserDataToClient(user) : null;
}

export async function saveToken(params: SaveTokenParams, metadata: ProviderTypes.Metadata): Promise<void> {
  await authorizationClient.saveTokenCommand(mapSaveTokenToProto(params), metadata);
}

export async function revokeToken(params: RevokeTokenParams, metadata: ProviderTypes.Metadata): Promise<void> {
  await authorizationClient.revokeTokenCommand(mapRevokeTokenToProto(params), metadata);
}

export async function verifyScope(params: VerifyScopeParams, metadata: ProviderTypes.Metadata): Promise<boolean> {
  const result = await authorizationClient.verifyScopeCommand(mapVerifyScopeToProto(params), metadata);
  return result.verified || false;
}

export function verifyEmail(params: VerifyEmailParams, metadata: ProviderTypes.Metadata): Promise<void> {
  return authorizationClient.verifyEmailCommand(params, metadata);
}

export async function getSignupToken(
  params: GetSignupTokenParams,
  metadata: ProviderTypes.Metadata,
): Promise<GetSignupTokenResult | null> {
  const { id, token } = await authorizationClient.getSignupToken(params, metadata);
  if (!id || !token) {
    return null;
  }

  return { id, token };
}
