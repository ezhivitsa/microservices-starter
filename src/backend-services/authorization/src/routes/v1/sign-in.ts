import { AppContext } from '@packages/koa-kafka';

export async function signInHandler(ctx: AppContext): Promise<void> {
  ctx.body = {
    accessToken: '123',
  };
}
