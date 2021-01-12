import { AppKoaState, AppKoaContext } from 'koa';
import Router from '@koa/router';
import { Version } from '@packages/communication';

import { tokensMiddleware, authMiddleware, versionMiddleware } from 'middlewares';

import { publicRouter } from './public';
import { authenticatedRouter } from './authenticated';

const v1Router = new Router<AppKoaState, AppKoaContext>();

v1Router
  .use(versionMiddleware(Version.v1))
  .use(publicRouter.routes())
  .use(tokensMiddleware)
  .use(authMiddleware)
  .use(authenticatedRouter.routes(), authenticatedRouter.allowedMethods());

export { v1Router };
