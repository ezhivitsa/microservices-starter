import { KoaKafka, Version, AppState, AppContext } from '@packages/koa-kafka';
import { UserCommand } from '@packages/communication';

import { signUpHandler } from './sign-up';
import { getCurrentUserHandler } from './get-current-user';

import { registrationSchema, getCurrentUserSchema } from './validators';

export function initV1Routes(app: KoaKafka<AppState, AppContext>): void {
  app.handleCommand({
    version: Version.v1,
    command: UserCommand.Registration,
    schema: registrationSchema,
    handler: signUpHandler,
  });
  app.handleCommand({
    version: Version.v1,
    command: UserCommand.GetCurrentUser,
    schema: getCurrentUserSchema,
    handler: getCurrentUserHandler,
  });
}
