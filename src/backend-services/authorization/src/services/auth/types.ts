import { UserRole } from 'lib/db/models/enums';

export interface RegisterParams {
  email: string;
  password: string;
  owner: boolean;
}

export interface GetAccessTokenParams {
  accessToken: string;
}

export interface User {
  id: string;
  email: string;
  roles: UserRole[];
  signupToken: string;
  isEmailVerified: boolean;
  createdAt: Date;
}

export interface UserShort {
  id: string;
}

export interface GetAccessTokenResult {
  accessToken: string;
  accessTokenExpiresAt: Date;
  user: User;
}

export interface GetRefreshTokenParams {
  refreshToken: string;
}

export interface GetRefreshTokenResult {
  refreshToken: string;
  refreshTokenExpiresAt: Date;
  user: User;
}

export interface GetUserParams {
  email: string;
  password: string;
}

export interface SaveTokenParams {
  accessToken: string;
  accessTokenExpiresAt: Date;
  refreshToken: string;
  refreshTokenExpiresAt: Date;
  user: UserShort;
}

export interface RevokeTokenParams {
  accessToken?: string;
  refreshToken: string;
  user: UserShort;
}

export interface VerifyScopeParams {
  accessToken: string;
  accessTokenExpiresAt: Date;
  user: UserShort;
}

export interface VerifyEmailParams {
  token: string;
}

export interface GetUserByEmailParams {
  email: string;
}

export interface GetForgotPasswordTokenParams {
  email: string;
}

export interface GetForgotPasswordTokenResult {
  id: string;
  token: string;
}

export interface ResetPasswordParams {
  token: string;
  password: string;
}
