import { RouterAppContext } from 'koa';

import { UsersService } from 'services';

import { GetCurrentUserResponse } from './types';

export async function getCurrent(ctx: RouterAppContext): Promise<void> {
  const user = await UsersService.getUserByAuthId(
    {
      authId: '',
    },
    ctx.state,
  );

  const response: GetCurrentUserResponse = {
    user,
  };
  ctx.body = response;
}
