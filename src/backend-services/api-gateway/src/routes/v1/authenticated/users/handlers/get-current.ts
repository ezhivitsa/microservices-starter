import { RouterAppContext } from 'koa';

import { ServiceTypes } from '@packages/common';

import { UsersService } from 'services';

export async function getCurrentHandler(ctx: RouterAppContext): Promise<void> {
  const user = await UsersService.getUserByAuthId(
    {
      authId: ctx.state.user.id,
    },
    ctx.state,
  );

  if (!user) {
    ctx.throw(404);
  }

  const { firstName, lastName, email } = user;
  const { isEmailVerified } = ctx.state.user;

  const response: ServiceTypes.GetCurrentUserResponse = {
    firstName,
    lastName,
    email,
    isEmailVerified,
  };
  ctx.body = response;
}
