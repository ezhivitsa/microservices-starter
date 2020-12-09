import OAuth2Server from 'oauth2-server';

import { config } from 'lib/config';

import { oauthModel } from './model';

export const oauth = new OAuth2Server({
  model: oauthModel,
  accessTokenLifetime: config.tokens.accessTokenLifetime,
  refreshTokenLifetime: config.tokens.refreshTokenLifetime,
});
