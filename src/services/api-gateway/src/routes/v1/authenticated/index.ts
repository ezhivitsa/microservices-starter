import Router from '@koa/router';

import { usersRouter } from './users';

const authenticatedRouter = new Router();

authenticatedRouter.use('/users', usersRouter.routes());

export { authenticatedRouter };
