import { AppContext } from '@packages/koa-kafka';
import { UserTypes } from '@packages/communication';

import { UsersService } from 'services';

import { UpdateUserRequest } from '../types';

export async function updateUserHandler(ctx: AppContext): Promise<void> {
  const data: UpdateUserRequest = ctx.data;
  const user = await UsersService.updateUser(data);

  const response: UserTypes.UpdateUserResponse = {
    user: user || undefined,
  };

  ctx.body = response;
}
