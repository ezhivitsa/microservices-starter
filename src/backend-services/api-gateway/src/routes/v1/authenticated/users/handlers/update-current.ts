import { RouterAppContext } from 'koa';

import { ServiceTypes } from '@packages/common';

import { UsersService } from 'services';

export async function updateCurrentHandler(ctx: RouterAppContext): Promise<void> {
  const data: ServiceTypes.UpdateCurrentUserRequest = ctx.state.validatedRequest.value;
}
