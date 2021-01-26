export const enum UserRole {
  User = 'user',
  Admin = 'admin',
  OrganizationAdmin = 'organization-admin',
}

export interface User {
  id: string;
  email: string;
  roles: UserRole[];
  isEmailVerified: boolean;
  registeredAt: Date;
}

export interface RegisterParams {
  email: string;
  password: string;
  owner: boolean;
}

export interface RegisterResult {
  id: string;
  signupToken: string;
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
  accessToken?: string;
  refreshToken: string;
  user: User;
}

export interface VerifyScopeParams {
  accessToken: string;
  accessTokenExpiresAt: Date;
  user: User;
}

export interface VerifyEmailParams {
  token: string;
}

export interface GetSignupTokenParams {
  email: string;
}

export interface GetSignupTokenResult {
  id: string;
  token: string;
}
