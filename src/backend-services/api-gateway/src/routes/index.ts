import Router from '@koa/router';

import { Constants } from '@packages/common';

import { v1Router } from './v1';

const apiRouter = new Router();

// apiRouter.all();
apiRouter.use(Constants.versionV1, v1Router.routes(), v1Router.allowedMethods());

export { apiRouter };
