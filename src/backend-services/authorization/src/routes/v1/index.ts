import { KoaKafka, Version, AppState, AppContext } from '@packages/koa-kafka';
import { AuthorizationCommand } from '@packages/communication';

import {
  signUpHandler,
  getAccessTokenHandler,
  getRefreshTokenHandler,
  getUserHandler,
  saveTokenHandler,
  revokeTokenHandler,
  verifyScopeHandler,
  verifyEmailHandler,
} from './handlers';
import {
  registrationSchema,
  getAccessTokenSchema,
  getRefreshTokenSchema,
  getUserSchema,
  saveTokenSchema,
  revokeTokenSchema,
  verifyScopeSchema,
  verifyEmailSchema,
} from './validators';

export function initV1Routes(app: KoaKafka<AppState, AppContext>): void {
  app.handleCommand({
    version: Version.v1,
    command: AuthorizationCommand.Registration,
    schema: registrationSchema,
    handler: signUpHandler,
  });
  app.handleCommand({
    version: Version.v1,
    command: AuthorizationCommand.GetAccessToken,
    schema: getAccessTokenSchema,
    handler: getAccessTokenHandler,
  });
  app.handleCommand({
    version: Version.v1,
    command: AuthorizationCommand.GetRefreshToken,
    schema: getRefreshTokenSchema,
    handler: getRefreshTokenHandler,
  });
  app.handleCommand({
    version: Version.v1,
    command: AuthorizationCommand.GetUser,
    schema: getUserSchema,
    handler: getUserHandler,
  });
  app.handleCommand({
    version: Version.v1,
    command: AuthorizationCommand.SaveToken,
    schema: saveTokenSchema,
    handler: saveTokenHandler,
  });
  app.handleCommand({
    version: Version.v1,
    command: AuthorizationCommand.RevokeToken,
    schema: revokeTokenSchema,
    handler: revokeTokenHandler,
  });
  app.handleCommand({
    version: Version.v1,
    command: AuthorizationCommand.VerifyScope,
    schema: verifyScopeSchema,
    handler: verifyScopeHandler,
  });
  app.handleCommand({
    version: Version.v1,
    command: AuthorizationCommand.VerifyEmail,
    schema: verifyEmailSchema,
    handler: verifyEmailHandler,
  });
}
