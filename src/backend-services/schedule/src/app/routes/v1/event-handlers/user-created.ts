import { UserTypes } from '@packages/communication';
import { AppContext } from '@packages/koa-kafka';

import { UsersService } from '@root/services';

import { mapUserCreatedToClient } from './converters';

export async function userCreatedHandler(ctx: AppContext): Promise<void> {
  const event: UserTypes.UserCreatedEvent = ctx.data;

  const data = mapUserCreatedToClient(event.data || {});
  if (data) {
    await UsersService.createUser(data);
  }
}
