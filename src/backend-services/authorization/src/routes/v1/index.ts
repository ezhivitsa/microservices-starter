import { KoaKafka, Version, AppState, AppContext } from '@packages/koa-kafka';
import { AuthorizationCommand } from '@packages/communication';

import { signUpHandler } from './sign-up';
import { getAccessTokenHandler } from './get-access-token';
import { getRefreshTokenHandler } from './get-refresh-token';
import { getUserHandler } from './get-user';

import {
  registrationSchema,
  getAccessTokenSchema,
  getRefreshTokenSchema,
  getUserSchema,
  saveTokenSchema,
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
  // app.handleCommand(Version.v1, AuthorizationCommand.RevokeToken, revokeTokenHandler);
  // app.handleCommand(Version.v1, AuthorizationCommand.VerifyScope, verifyScopeHandler);
}
