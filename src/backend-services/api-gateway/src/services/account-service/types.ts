export const enum Role {
  USER = 'user',
  ADMIN = 'admin',
  ORGANIZATION_ADMIN = 'organization-admin',
}

export interface User {
  id: string;
  email: string;
  roles: Role[];
}

export interface RegisterRequest {
  email: string;
  password: string;
  owner: boolean;
}

export interface GetAccessTokenRequest {
  accessToken: string;
}

export interface AccessToken {
  accessToken: string;
  accessTokenExpiresAt: Date;
  user: User;
}
