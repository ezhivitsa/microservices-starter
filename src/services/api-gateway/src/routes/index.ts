import Router from '@koa/router';

import { v1Router } from './v1';

const apiRouter = new Router();

apiRouter.use('/v1', v1Router.routes(), v1Router.allowedMethods());

export { apiRouter };
