import { AppKoaState } from 'koa';
import Router from '@koa/router';
import { Version } from '@packages/communication';

import { authMiddleware, userMiddleware, versionMiddleware } from 'middlewares';

import { publicRouter } from './public';
import { authenticatedRouter } from './authenticated';

const v1Router = new Router<AppKoaState>();

v1Router
  .use(versionMiddleware(Version.v1))
  .use(publicRouter.routes())
  .use(authMiddleware)
  .use(userMiddleware)
  .use(authenticatedRouter.routes());

export { v1Router };
