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
  user: {
    id: string;
  };
}
