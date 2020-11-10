import Router from '@koa/router';

import { getComponentPathTemplate } from 'common/constants';

import { getComponent } from './get-component';

const apiRouter = new Router();

apiRouter.get(getComponentPathTemplate, getComponent);

export { apiRouter };
