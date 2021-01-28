import { KoaKafka, Version, AppState, AppContext } from '@packages/koa-kafka';
import { EmailCommand } from '@packages/communication';

import { sendVerifyEmailSchema, sendForgotPasswordEmailSchema } from './validators';
import { sendVerifyEmailHandler, sendForgotPasswordEmailHandler } from './handlers';

export function initV1Routes(app: KoaKafka<AppState, AppContext>): void {
  app.handleCommand({
    version: Version.v1,
    command: EmailCommand.SendVerifyEmail,
    schema: sendVerifyEmailSchema,
    handler: sendVerifyEmailHandler,
  });
  app.handleCommand({
    version: Version.v1,
    command: EmailCommand.SendForgotPasswordEmail,
    schema: sendForgotPasswordEmailSchema,
    handler: sendForgotPasswordEmailHandler,
  });
}
