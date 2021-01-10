import { AppContext } from '@packages/koa-kafka';
import { AuthorizationTypes } from '@packages/communication';

import { UsersService } from 'services';

import { GetUserByAuthIdRequest } from '../types';

export async function getUserByUserIdHandler(ctx: AppContext): Promise<void> {
  const data: GetUserByAuthIdRequest = ctx.data;
  const user = await UsersService.getUserByAuthId(data);

  const response: AuthorizationTypes.GetUserResponse = {
    user: user || undefined,
  };

  ctx.body = response;
}
