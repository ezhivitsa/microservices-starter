import { AppKoaState, AppKoaContext } from 'koa';
import Router from '@koa/router';

import { usersRouter } from './users';

const authenticatedRouter = new Router<AppKoaState, AppKoaContext>();

authenticatedRouter.use('/users', usersRouter.routes());

export { authenticatedRouter };
