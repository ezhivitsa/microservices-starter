export const enum UserRole {
  User = 'user',
  Admin = 'admin',
  OrganizationAdmin = 'organization-admin',
}

export interface User {
  id: string;
  email: string;
  roles: UserRole[];
}

export interface RegisterParams {
  email: string;
  password: string;
  owner: boolean;
}

export interface GetAccessTokenParams {
  accessToken: string;
}

export interface AccessToken {
  accessToken: string;
  accessTokenExpiresAt: Date;
  user: User;
}

export interface GetRefreshTokenParams {
  refreshToken: string;
}

export interface RefreshToken {
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
  user: User;
}

export interface RevokeTokenParams {
  refreshToken: string;
  refreshTokenExpiresAt: Date;
  user: User;
}

export interface VerifyScopeParams {
  accessToken: string;
  accessTokenExpiresAt: Date;
  user: User;
}
