import { AppKoaState, AppKoaContext } from 'koa';
import Router from '@koa/router';

import { ServerConstants } from '@packages/common';

import { accountRouter } from './account';

const publicRouter = new Router<AppKoaState, AppKoaContext>();

publicRouter.use(ServerConstants.authorizationPrefix, accountRouter.routes());

export { publicRouter };
