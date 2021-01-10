import { RouterAppContext } from 'koa';

import { ServiceTypes } from '@packages/common';

import { UsersService } from 'services';

export async function getCurrentHandler(ctx: RouterAppContext): Promise<void> {
  const user = await UsersService.getUserByAuthId(
    {
      authId: '',
    },
    ctx.state,
  );

  if (!user) {
    ctx.throw(404);
  }

  const { firstName, lastName, email } = user;

  const response: ServiceTypes.GetCurrentUserResponse = {
    firstName,
    lastName,
    email,
  };
  ctx.body = response;
}
