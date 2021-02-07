import { AuthService, AuthTypes } from '@root/services';

import { getTomorrow } from '../utils/date';

const tomorrow = getTomorrow();

export const testUser: AuthTypes.RegisterParams = {
  email: 'test@test.com',
  password: 'qwerty',
  owner: true,
};

export const testTokenData: AuthTypes.SaveTokenParams = {
  accessToken: '12345',
  accessTokenExpiresAt: tomorrow,
  refreshToken: '123456',
  refreshTokenExpiresAt: tomorrow,
  user: {
    id: '1',
  },
};

export function registerUser(userData: Partial<AuthTypes.RegisterParams> = {}): Promise<AuthTypes.User> {
  return AuthService.register({
    ...testUser,
    ...userData,
  });
}

export function getUserById(id: string): Promise<AuthTypes.User | null> {
  return AuthService.getUserById({ id });
}

export function saveToken(tokenData: Partial<AuthTypes.SaveTokenParams> = {}): Promise<void> {
  return AuthService.saveToken({
    ...testTokenData,
    ...tokenData,
  });
}

export async function createUserAndSaveToken(
  userData: Partial<AuthTypes.RegisterParams> = {},
  tokenData: Partial<AuthTypes.SaveTokenParams> = {},
): Promise<AuthTypes.User> {
  const user = await registerUser(userData);
  await saveToken({
    ...tokenData,
    user: {
      id: user.id,
    },
  });

  return user;
}

export function getResetPasswordToken(email: string): Promise<AuthTypes.GetForgotPasswordTokenResult> {
  return AuthService.getForgotPasswordToken({ email });
}

export function getAccessToken(accessToken: string): Promise<AuthTypes.GetAccessTokenResult | null> {
  return AuthService.getAccessToken({ accessToken });
}
