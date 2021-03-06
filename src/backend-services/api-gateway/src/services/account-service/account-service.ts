import { AuthorizationError, AuthorizationTypes } from '@packages/communication';
import { Errors } from '@packages/common';

import { AuthProvider, UsersProvider, EmailProvider } from 'providers';
import { ApiError } from 'errors';

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
  SendForgotPasswordEmailParams,
  ResetPasswordParams,
} from './types';

import { RegisterSaga, RegisterSagaState } from './sagas';

export async function register(params: RegisterParams, metadata: ServiceMetadata): Promise<string | null> {
  const state = new RegisterSagaState(params);
  const registerSaga = new RegisterSaga(state);

  try {
    await registerSaga.start(metadata);
  } catch (err) {
    if (err instanceof AuthorizationError) {
      let type: Errors.ErrorType = Errors.CommonErrorType.General;
      if (err.code === AuthorizationTypes.ErrorCode.DuplicateEmail) {
        type = Errors.AuthorizationErrorType.DuplicateEmail;
      }

      throw new ApiError(type, err.message);
    }

    throw err;
  }

  return state.token;
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

  const user = await UsersProvider.getUserByAuthId({ authId: data.id }, metadata);
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

export async function sendForgotPasswordEmail(
  params: SendForgotPasswordEmailParams,
  metadata: ServiceMetadata,
): Promise<void> {
  const data = await AuthProvider.getForgotPasswordToken(params, metadata);
  if (!data) {
    return;
  }

  const user = await UsersProvider.getUserByAuthId({ authId: data.id }, metadata);
  if (!user) {
    return;
  }

  await EmailProvider.sendForgotPasswordEmail(
    {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: data.token,
    },
    metadata,
  );
}

export async function resetPassword(params: ResetPasswordParams, metadata: ServiceMetadata): Promise<void> {
  await AuthProvider.resetPassword(params, metadata);
}
