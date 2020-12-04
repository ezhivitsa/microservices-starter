import { RouterAppContext } from 'koa';

export async function getCurrent(ctx: RouterAppContext): Promise<void> {
  ctx.body = 'current user';
}
