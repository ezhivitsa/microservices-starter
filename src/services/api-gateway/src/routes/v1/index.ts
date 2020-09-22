import Router from '@koa/router';

import { authMiddleware, userMiddleware } from 'middlewares';

import { publicRouter } from './public';
import { authenticatedRouter } from './authenticated';

const v1Router = new Router();

v1Router.use(publicRouter.routes()).use(authMiddleware).use(userMiddleware).use(authenticatedRouter.routes());

export { v1Router };
