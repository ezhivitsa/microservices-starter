import Router from '@koa/router';

import { Constants } from '@packages/common';

import { accountRouter } from './account';

const publicRouter = new Router();

publicRouter.use(Constants.authorizationPrefix, accountRouter.routes());

export { publicRouter };
