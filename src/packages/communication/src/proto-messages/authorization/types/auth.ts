import { Timestamp } from '../../google';

// Registration
export interface RegistrationRequest {
  email?: string;
  password?: string;
  owner?: boolean;
}

export interface RegistrationResponse {
  id?: string;
}

export const enum Role {
  Unknown = 0,
  User = 1,
  Admin = 2,
  OrganizationAdmin = 3,
}

export interface User {
  id?: string;
  email?: string;
  roles?: Role[];
}

// GetAccessToken
export interface GetAccessTokenRequest {
  accessToken?: string;
}

export interface AccessToken {
  accessToken?: string;
  accessTokenExpiresAt?: Timestamp;
  user?: User;
}

export interface GetAccessTokenResponse {
  token?: AccessToken;
}

// GetRefreshToken
export interface GetRefreshTokenRequest {
  refreshToken?: string;
}

export interface RefreshToken {
  refreshToken?: string;
  refreshTokenExpiresAt?: Timestamp;
  user?: User;
}

export interface GetRefreshTokenResponse {
  token?: RefreshToken;
}

// GetUser
export interface GetUserRequest {
  email?: string;
  password?: string;
}

export interface GetUserResponse {
  user?: User;
}

// SaveToken
export interface SaveTokenRequest {
  accessToken?: string;
  accessTokenExpiresAt?: Timestamp;
  refreshToken?: string;
  refreshTokenExpiresAt?: Timestamp;
  user?: User;
}

// RevokeToken
export interface RevokeTokenRequest {
  refreshToken?: string;
  refreshTokenExpiresAt?: Timestamp;
  user?: User;
}

// VerifyScope
export interface VerifyScopeRequest {
  accessToken?: string;
  accessTokenExpiresAt?: Timestamp;
  user?: User;
}

export interface VerifyScopeResponse {
  verified: boolean;
}
