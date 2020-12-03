import { AppContext } from '@packages/koa-kafka';

export async function signInHandler(ctx: AppContext): Promise<void> {
  console.log(ctx);
  ctx.body = {
    token: '123',
  };
}
