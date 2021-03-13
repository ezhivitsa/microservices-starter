import { UserTypes } from '@packages/communication';
import { AppContext } from '@packages/koa-kafka';

import { UsersService } from '@root/services';

import { mapUserUpdatedToClient } from './converters';

export async function userUpdatedHandler(ctx: AppContext): Promise<void> {
  const event: UserTypes.UserUpdatedEvent = ctx.data;

  const data = mapUserUpdatedToClient(event.data || {});
  if (data) {
    await UsersService.updateUser(data);
  }
}
