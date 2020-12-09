import OAuth2Server, { Token } from 'oauth2-server';

import { generateSecureToken } from '../secure';

export const oauthModel: OAuth2Server.RefreshTokenModel = {
  async generateAccessToken(): Promise<string> {
    return generateSecureToken();
  },

  async generateRefreshToken(): Promise<string> {
    return generateSecureToken();
  },

  async getAccessToken(): Promise<Token | null> {},

  getClient: async () => {
    return null;
  },

  saveToken: async () => {
    return null;
  },

  getRefreshToken: async () => {
    return null;
  },

  revokeToken: async (): Promise<boolean> => {
    return true;
  },

  verifyScope: async (): Promise<boolean> => {
    return true;
  },
};
