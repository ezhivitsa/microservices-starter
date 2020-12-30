import { AppContext } from '@packages/koa-kafka';
import { AuthorizationTypes } from '@packages/communication';

import { AuthService } from 'services';

import { mapUserDataToProto } from './converters';

export async function getUserHandler(ctx: AppContext): Promise<void> {
  const data: AuthorizationTypes.GetUserRequest = ctx.data;
  const user = await AuthService.getUser(data);

  const response: AuthorizationTypes.GetUserResponse = {
    user: user ? mapUserDataToProto(user) : undefined,
  };

  ctx.body = response;
}
