import { KoaKafka, Version, AppState, AppContext } from '@packages/koa-kafka';
import { AuthorizationCommand } from '@packages/communication';

import { signUpHandler } from './sign-up';
import { signInHandler } from './sign-in';

export function initV1Routes(app: KoaKafka<AppState, AppContext>): void {
  app.handleCommand(Version.v1, AuthorizationCommand.Registration, signUpHandler);
  app.handleCommand(Version.v1, AuthorizationCommand.SignIn, signInHandler);
}
