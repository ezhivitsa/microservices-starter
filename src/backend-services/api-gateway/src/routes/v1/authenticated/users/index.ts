import { AppKoaState, AppKoaContext } from 'koa';
import Router from '@koa/router';

import { ServerConstants } from '@packages/common';

import { validateMiddleware } from 'middlewares';

import { updateCurrentValidator } from './validators';
import { getCurrentHandler, updateCurrentHandler, logOutHandler } from './handlers';

const usersRouter = new Router<AppKoaState, AppKoaContext>();

usersRouter
  .get(ServerConstants.currentPath, getCurrentHandler)
  .put(ServerConstants.currentPath, validateMiddleware(updateCurrentValidator), updateCurrentHandler)
  .post(ServerConstants.logOutPath, logOutHandler);

export { usersRouter };
