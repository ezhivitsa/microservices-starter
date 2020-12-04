import { AppMiddleware, AppContext, Next } from 'koa';

export const errorsMiddleware: AppMiddleware = async (ctx: AppContext, next: Next): Promise<void> => {
  try {
    await next();
  } catch (err) {
    ctx.state.logger.error(err);
    ctx.status = err.status || 500;
  }
};
