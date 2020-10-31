import { AppContext } from '@packages/koa-kafka';

export async function signUpHandler(ctx: AppContext): Promise<void> {
  ctx.body = {
    token: '123',
  };
}
