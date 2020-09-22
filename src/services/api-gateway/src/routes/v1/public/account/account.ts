import { AppContext } from 'koa';

export async function signUp(ctx: AppContext): Promise<void> {
  ctx.body = 'sign up result';
}
