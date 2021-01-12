import { KoaKafka, Version, AppState, AppContext } from '@packages/koa-kafka';
import { UserCommand } from '@packages/communication';

import { registrationSchema, getUserByAuthIdSchema, updateUserSchema } from './validators';
import { getUserByUserIdHandler, signUpHandler, updateUserHandler } from './handlers';

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
  app.handleCommand({
    version: Version.v1,
    command: UserCommand.UpdateUser,
    schema: updateUserSchema,
    handler: updateUserHandler,
  });
}
