import { RouterAppMiddleware, RouterAppContext, Next } from 'koa';
import { Version } from '@packages/communication';

export const versionMiddleware = (version: Version): RouterAppMiddleware => async (
  ctx: RouterAppContext,
  next: Next,
): Promise<void> => {
  ctx.state.version = version;

  await next();
};
