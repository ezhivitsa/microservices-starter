import { AppKoaState, AppKoaContext } from 'koa';
import Router from '@koa/router';

import { Constants } from '@packages/common';

import { validateMiddleware } from 'middlewares';

import { updateCurrentValidators } from './validators';
import { getCurrentHandler, updateCurrentHandler, logOutHandler } from './handlers';

const usersRouter = new Router<AppKoaState, AppKoaContext>();

usersRouter
  .get(Constants.currentPath, getCurrentHandler)
  .put(Constants.currentPath, validateMiddleware(updateCurrentValidators), updateCurrentHandler)
  .post(Constants.logOutPath, logOutHandler);

export { usersRouter };
