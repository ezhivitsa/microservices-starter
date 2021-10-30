import devMiddleware, { Options, WebpackDevMiddleware } from 'webpack-dev-middleware';
import { Compiler } from 'webpack';
import { NextHandleFunction } from 'connect';
import { RouterAppMiddleware, RouterAppContext, Next } from 'koa';
import { IncomingMessage } from 'http';

function middleware(doIt: WebpackDevMiddleware & NextHandleFunction, req: IncomingMessage, res: any): Promise<number> {
  const { end: originalEnd } = res;

  return new Promise((resolve) => {
    res.end = function end(...args: any[]) {
      originalEnd.apply(this, args);
      resolve(0);
    };
    doIt(req, res, () => {
      resolve(1);
    });
  });
}

export const webpackDevMiddleware = (compiler: Compiler, option?: Options): RouterAppMiddleware => {
  const doIt = devMiddleware(compiler, option);

  const koaMiddleware: RouterAppMiddleware = async (ctx: RouterAppContext, next: Next): Promise<void> => {
    const { req } = ctx;
    const locals = ctx.locals || ctx.state;

    ctx.webpack = doIt;

    const runNext = await middleware(doIt, req, {
      end(content: any) {
        ctx.body = content;
      },
      locals,
      setHeader(...args: any[]) {
        ctx.set.apply(ctx, args as any); // eslint-disable-line
      },
      getHeader(...args: any[]) {
        ctx.get.apply(ctx, args as any); // eslint-disable-line
      },
    });

    if (runNext) {
      await next();
    }
  };

  return koaMiddleware;
};
