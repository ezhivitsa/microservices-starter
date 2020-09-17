import Router from '@koa/router';

import { accountRouter } from './account';

const publicRouter = new Router();

publicRouter.use('/account', accountRouter.routes());

export { publicRouter };
