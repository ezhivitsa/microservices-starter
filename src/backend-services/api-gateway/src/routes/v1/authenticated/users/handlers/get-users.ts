import { RouterAppContext } from 'koa';

import { ServiceTypes } from '@packages/common';

import { UsersService } from 'services';

export async function getUsersHandler(ctx: RouterAppContext): Promise<void> {
  const users = await UsersService.getUsers(ctx.state);

  const response: ServiceTypes.GetUsersResponse = {
    users,
  };
  ctx.body = response;
}
