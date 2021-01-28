import { AppContext } from '@packages/koa-kafka';
import { AuthorizationTypes } from '@packages/communication';

import { AuthService } from 'services';

import { GetForgotPasswordTokenRequest } from '../types';

export async function getForgotPasswordTokenHandler(ctx: AppContext): Promise<void> {
  const data: GetForgotPasswordTokenRequest = ctx.data;
  const { id, token } = await AuthService.getForgotPasswordToken(data);

  const response: AuthorizationTypes.GetForgotPasswordTokenResponse = {
    id,
    token,
  };
  ctx.body = response;
}
