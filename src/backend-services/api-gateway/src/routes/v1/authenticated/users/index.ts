import { AppKoaState, AppKoaContext } from 'koa';
import Router from '@koa/router';

import { getCurrent } from './users';

const usersRouter = new Router<AppKoaState, AppKoaContext>();

usersRouter.get('/current', getCurrent);

export { usersRouter };
