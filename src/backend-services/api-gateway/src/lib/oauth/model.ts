import OAuth2Server, { Token, Client, RefreshToken, User } from 'oauth2-server';
import { getResponseChannel, Version } from '@packages/communication';

import { generateSecureToken } from 'lib/secure';
import { config } from 'lib/config';

import { AccountService, AccountTypes } from 'services';
import { ServiceMetadata } from 'services/types';

const SCOPE = 'api-gateway';

export const CLIENT_SECRET = 'api-gateway-client-secret';
export const client: Client = {
  id: 'api-gateway-client-id',
  grants: ['password', 'refresh_token'],
};

const metadata: ServiceMetadata = {
  requestId: '',
  responseChannel: getResponseChannel(config.kafkaConsumer.groupId),
  version: Version.v1,
};

function getAccessTokenExpiresAt(expiresAt: Date | undefined): Date {
  if (expiresAt) {
    return expiresAt;
  }

  const accessTokenExpiresAt = new Date();
  accessTokenExpiresAt.setSeconds(accessTokenExpiresAt.getSeconds() + config.tokens.accessTokenLifetime);

  return accessTokenExpiresAt;
}

function getRefreshTokenExpiresAt(expiresAt: Date | undefined): Date {
  if (expiresAt) {
    return expiresAt;
  }

  const refreshTokenExpiresAt = new Date();
  refreshTokenExpiresAt.setSeconds(refreshTokenExpiresAt.getSeconds() + config.tokens.refreshTokenLifetime);

  return refreshTokenExpiresAt;
}

function isUser(userData: User): userData is AccountTypes.User {
  return userData.hasOwnProperty('id');
}

export const oauthModel: OAuth2Server.PasswordModel & OAuth2Server.RefreshTokenModel = {
  async generateAccessToken(): Promise<string> {
    return generateSecureToken();
  },

  async generateRefreshToken(): Promise<string> {
    return generateSecureToken();
  },

  async getAccessToken(accessToken: string): Promise<Token | null> {
    const token = await AccountService.getAccessToken({ accessToken }, metadata);
    if (!token) {
      return null;
    }

    return {
      accessToken: token.accessToken,
      accessTokenExpiresAt: token.accessTokenExpiresAt,
      scope: SCOPE,
      client,
      user: token.user,
    };
  },

  async getClient(): Promise<Client> {
    return client;
  },

  async getUser(username: string, password: string): Promise<User | null> {
    const user = await AccountService.getUser(
      {
        email: username,
        password,
      },
      metadata,
    );

    return user;
  },

  async saveToken(token: Token, client: Client, user: User): Promise<Token | null> {
    const { accessToken, refreshToken, scope } = token;

    if (!refreshToken || !user || !isUser(user)) {
      return null;
    }

    const accessTokenExpiresAt = getAccessTokenExpiresAt(token.accessTokenExpiresAt);
    const refreshTokenExpiresAt = getAccessTokenExpiresAt(token.refreshTokenExpiresAt);

    const tokenData: Token = {
      accessToken,
      refreshToken,
      accessTokenExpiresAt,
      refreshTokenExpiresAt,
      scope,
      client,
      user,
    };

    await AccountService.saveToken(
      {
        accessToken,
        refreshToken,
        accessTokenExpiresAt,
        refreshTokenExpiresAt,
        user,
      },
      metadata,
    );

    return tokenData;
  },

  async getRefreshToken(refreshToken: string): Promise<RefreshToken | null> {
    const token = await AccountService.getRefreshToken({ refreshToken }, metadata);
    if (!token) {
      return null;
    }

    return {
      refreshToken: token.refreshToken,
      refreshTokenExpiresAt: token.refreshTokenExpiresAt,
      scope: SCOPE,
      client,
      user: token.user,
    };
  },

  async revokeToken(token: RefreshToken | Token): Promise<boolean> {
    const { accessToken, refreshToken, user } = token;
    if (!refreshToken || !isUser(user)) {
      return false;
    }

    await AccountService.revokeToken(
      {
        accessToken,
        refreshToken,
        user,
      },
      metadata,
    );
    return true;
  },

  async verifyScope(token: Token): Promise<boolean> {
    const { accessToken, accessTokenExpiresAt, user } = token;

    if (!isUser(user)) {
      return false;
    }

    const verified = await AccountService.verifyScope(
      {
        accessToken,
        accessTokenExpiresAt: getAccessTokenExpiresAt(accessTokenExpiresAt),
        user,
      },
      metadata,
    );
    return verified;
  },
};
