import { AppContext } from '@packages/koa-kafka';

// import { UsersService } from 'services';

import { SendVerifyEmailRequest } from '../types';

export async function sendVerifyEmailHandler(ctx: AppContext): Promise<void> {
  const data: SendVerifyEmailRequest = ctx.data;
  // const user = await UsersService.getUserByAuthId(data);

  // const response: UserTypes.GetUserByAuthIdResponse = {
  //   user: user || undefined,
  // };

  ctx.body = null;
}
