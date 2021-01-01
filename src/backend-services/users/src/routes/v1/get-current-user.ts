import { AppContext } from '@packages/koa-kafka';
import { AuthorizationTypes } from '@packages/communication';

import { UsersService } from 'services';

import { GetCurrentUserRequest } from './types';

export async function getCurrentUserHandler(ctx: AppContext): Promise<void> {
  const data: GetCurrentUserRequest = ctx.data;
  const user = await UsersService.getUserByAuthId(data);

  const response: AuthorizationTypes.GetUserResponse = {
    user: user || undefined,
  };

  ctx.body = response;
}
