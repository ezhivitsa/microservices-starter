import { AuthProvider, UsersProvider, EmailProvider } from 'providers';

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
  VerifyEmailParams,
  ResendVerifyEmailParams,
} from './types';

export async function register(params: RegisterParams, metadata: ServiceMetadata): Promise<string | null> {
  const authData = await AuthProvider.register(params, metadata);
  if (!authData) {
    return null;
  }

  const { id: authId, signupToken } = authData;

  await UsersProvider.register(
    {
      authId,
      ...params,
    },
    metadata,
  );

  await EmailProvider.sendVerifyEmail(
    {
      firstName: params.firstName,
      lastName: params.lastName,
      email: params.email,
      token: signupToken,
    },
    metadata,
  );

  return signupToken;
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

export function verifyEmail(params: VerifyEmailParams, metadata: ServiceMetadata): Promise<void> {
  return AuthProvider.verifyEmail(params, metadata);
}

export async function resendVerifyEmail(params: ResendVerifyEmailParams, metadata: ServiceMetadata): Promise<void> {
  const data = await AuthProvider.getSignupToken(params, metadata);
  if (!data) {
    return;
  }

  const user = await UsersProvider.getUserByAuthId(
    {
      authId: data.id,
    },
    metadata,
  );

  if (!user) {
    return;
  }

  await EmailProvider.sendVerifyEmail(
    {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: data.token,
    },
    metadata,
  );
}
