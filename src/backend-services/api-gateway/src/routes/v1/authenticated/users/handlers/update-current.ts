import { RouterAppContext } from 'koa';

import { ServiceTypes } from '@packages/common';

import { UsersService } from 'services';

export async function updateCurrentHandler(ctx: RouterAppContext): Promise<void> {
  const data: ServiceTypes.UpdateCurrentUserRequest = ctx.state.validatedRequest.value;

  const user = await UsersService.updateUser(
    {
      id: ctx.state.user.id,
      ...data,
    },
    ctx.state,
  );
  if (!user) {
    ctx.throw(404);
  }

  const { firstName, lastName, email } = user;

  const response: ServiceTypes.UpdateCurrentUserResponse = {
    firstName,
    lastName,
    email,
  };
  ctx.body = response;
}
