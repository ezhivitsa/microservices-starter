import { AppContext } from '@packages/koa-kafka';
import { AuthorizationTypes } from '@packages/communication';

import { AuthService } from 'services';

import { mapUserDataToProto } from '../converters';
import { GetUserRequest } from '../types';

export async function getUserHandler(ctx: AppContext): Promise<void> {
  const data: GetUserRequest = ctx.data;
  const user = await AuthService.getUser(data);

  const response: AuthorizationTypes.GetUserResponse = {
    user: user ? mapUserDataToProto(user) : undefined,
  };

  console.log(response);

  ctx.body = response;
}
