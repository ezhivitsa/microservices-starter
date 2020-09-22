import Router from '@koa/router';

import { getCurrent } from './users';

const usersRouter = new Router();

usersRouter.get('/current', getCurrent);

export { usersRouter };
