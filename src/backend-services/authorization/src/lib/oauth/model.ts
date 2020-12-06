import OAuth2Server from 'oauth2-server';

export const oauthModel: OAuth2Server.RefreshTokenModel = {
  getClient: async () => {
    return null;
  },

  saveToken: async () => {
    return null;
  },

  getAccessToken: async () => {
    return null;
  },

  generateAccessToken: async (): Promise<string> => {
    return '';
  },

  getRefreshToken: async () => {
    return null;
  },

  generateRefreshToken: async (): Promise<string> => {
    return '';
  },

  revokeToken: async (): Promise<boolean> => {
    return true;
  },

  verifyScope: async (): Promise<boolean> => {
    return true;
  },
};
