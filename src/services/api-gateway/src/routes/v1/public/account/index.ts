import Router from '@koa/router';

import { validateMiddleware } from 'middlewares';

import { signUp } from './account';

import { signUpValidators } from './validators';

const accountRouter = new Router();

accountRouter.post('/signup', validateMiddleware(signUpValidators), signUp);

export { accountRouter };
