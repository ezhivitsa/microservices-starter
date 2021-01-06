import { AppKoaState, AppKoaContext } from 'koa';
import Router from '@koa/router';

import { Constants } from '@packages/common';

import { getCurrent } from './users';

const usersRouter = new Router<AppKoaState, AppKoaContext>();

usersRouter.get(Constants.currentPath, getCurrent);

export { usersRouter };
