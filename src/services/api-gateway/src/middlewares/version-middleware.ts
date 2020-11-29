import { AppMiddleware, AppContext, Next } from 'koa';
import { Version } from '@packages/communication';

export const versionMiddleware = (version: Version): AppMiddleware => async (
  ctx: AppContext,
  next: Next,
): Promise<void> => {
  ctx.state.version = version;

  await next();
};
