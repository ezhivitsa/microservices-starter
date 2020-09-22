import { AppContext } from 'koa';

export async function getCurrent(ctx: AppContext): Promise<void> {
  ctx.body = 'current user';
}
