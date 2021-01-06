import { AppKoaState, AppKoaContext } from 'koa';
import Router from '@koa/router';

import { Constants } from '@packages/common';

import { usersRouter } from './users';

const authenticatedRouter = new Router<AppKoaState, AppKoaContext>();

authenticatedRouter.use(Constants.usersPrefix, usersRouter.routes());

export { authenticatedRouter };
