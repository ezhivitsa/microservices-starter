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
  getSignupTokenHandler,
  getForgotPasswordTokenHandler,
  resetPasswordHandler,
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
  getSignupTokenSchema,
  getForgotPasswordTokenSchema,
  resetPasswordSchema,
} from './validators';

export function initV1Routes(app: KoaKafka<AppState, AppContext>): void {
  app
    .handleCommand({
      version: Version.v1,
      command: AuthorizationCommand.Registration,
      schema: registrationSchema,
      handler: signUpHandler,
    })
    .handleCommand({
      version: Version.v1,
      command: AuthorizationCommand.GetAccessToken,
      schema: getAccessTokenSchema,
      handler: getAccessTokenHandler,
    })
    .handleCommand({
      version: Version.v1,
      command: AuthorizationCommand.GetRefreshToken,
      schema: getRefreshTokenSchema,
      handler: getRefreshTokenHandler,
    })
    .handleCommand({
      version: Version.v1,
      command: AuthorizationCommand.GetUser,
      schema: getUserSchema,
      handler: getUserHandler,
    })
    .handleCommand({
      version: Version.v1,
      command: AuthorizationCommand.SaveToken,
      schema: saveTokenSchema,
      handler: saveTokenHandler,
    })
    .handleCommand({
      version: Version.v1,
      command: AuthorizationCommand.RevokeToken,
      schema: revokeTokenSchema,
      handler: revokeTokenHandler,
    })
    .handleCommand({
      version: Version.v1,
      command: AuthorizationCommand.VerifyScope,
      schema: verifyScopeSchema,
      handler: verifyScopeHandler,
    })
    .handleCommand({
      version: Version.v1,
      command: AuthorizationCommand.VerifyEmail,
      schema: verifyEmailSchema,
      handler: verifyEmailHandler,
    })
    .handleCommand({
      version: Version.v1,
      command: AuthorizationCommand.GetSignupToken,
      schema: getSignupTokenSchema,
      handler: getSignupTokenHandler,
    })
    .handleCommand({
      version: Version.v1,
      command: AuthorizationCommand.GetForgotPasswordToken,
      schema: getForgotPasswordTokenSchema,
      handler: getForgotPasswordTokenHandler,
    })
    .handleCommand({
      version: Version.v1,
      command: AuthorizationCommand.ResetPassword,
      schema: resetPasswordSchema,
      handler: resetPasswordHandler,
    });
}
