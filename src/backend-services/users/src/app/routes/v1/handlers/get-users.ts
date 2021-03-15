import { AppContext } from '@packages/koa-kafka';
import { UserTypes } from '@packages/communication';

import { UsersService } from '@root/services';

export async function getUsersHandler(ctx: AppContext): Promise<void> {
  const users = await UsersService.getUsers();

  const response: UserTypes.GetUsersResponse = {
    users,
  };

  ctx.body = response;
}
