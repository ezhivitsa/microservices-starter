import { AppContext } from '@packages/koa-kafka';
import { UserTypes } from '@packages/communication';

import { UsersService } from '@root/services';

import { GetUserByAuthIdRequest } from '../types';

export async function getUserByUserIdHandler(ctx: AppContext): Promise<void> {
  const data: GetUserByAuthIdRequest = ctx.data;
  const user = await UsersService.getUserByAuthId(data);

  const response: UserTypes.GetUserByAuthIdResponse = {
    user: user || undefined,
  };

  ctx.body = response;
}
