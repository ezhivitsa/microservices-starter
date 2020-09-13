import Router from '@koa/router';

const publicRouter = new Router();

publicRouter.post('/signup');

export { publicRouter };
