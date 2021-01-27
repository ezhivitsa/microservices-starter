import { AppKoaState, AppKoaContext } from 'koa';
import Router from '@koa/router';

import { ServerConstants } from '@packages/common';

import { usersRouter } from './users';

const authenticatedRouter = new Router<AppKoaState, AppKoaContext>();

authenticatedRouter.use(ServerConstants.usersPrefix, usersRouter.routes(), usersRouter.allowedMethods());

export { authenticatedRouter };
