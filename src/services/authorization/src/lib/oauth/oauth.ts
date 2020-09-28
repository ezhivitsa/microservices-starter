import OAuth2Server from 'oauth2-server';

export const oauth = new OAuth2Server({
  model: model,
  grants: ['auth_code', 'password', 'refresh_token'],
  debug: true,
  accessTokenLifetime: model.accessTokenLifetime,
});
