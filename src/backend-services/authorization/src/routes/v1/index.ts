import { KoaKafka, Version, AppState, AppContext } from '@packages/koa-kafka';
import { AuthorizationCommand } from '@packages/communication';

import { signUpHandler } from './sign-up';
import { getAccessTokenHandler } from './get-access-token';

import { registrationSchema, getAccessTokenSchema, getRefreshTokenSchema } from './validators';

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
  // app.handleCommand(Version.v1, AuthorizationCommand.GetUser, getUserHandler);
  // app.handleCommand(Version.v1, AuthorizationCommand.SaveToken, saveTokenHandler);
  // app.handleCommand(Version.v1, AuthorizationCommand.RevokeToken, revokeTokenHandler);
  // app.handleCommand(Version.v1, AuthorizationCommand.VerifyScope, verifyScopeHandler);
}
