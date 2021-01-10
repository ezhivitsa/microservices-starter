import { KoaKafka, Version, AppState, AppContext } from '@packages/koa-kafka';
import { UserCommand } from '@packages/communication';

import { registrationSchema, getUserByAuthIdSchema } from './validators';
import { getUserByUserIdHandler, signUpHandler } from './handlers';

export function initV1Routes(app: KoaKafka<AppState, AppContext>): void {
  app.handleCommand({
    version: Version.v1,
    command: UserCommand.Registration,
    schema: registrationSchema,
    handler: signUpHandler,
  });
  app.handleCommand({
    version: Version.v1,
    command: UserCommand.GetUserByAuthId,
    schema: getUserByAuthIdSchema,
    handler: getUserByUserIdHandler,
  });
}
