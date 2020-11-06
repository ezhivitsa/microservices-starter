import Router from '@koa/router';

import { Constants } from '@packages/common';

import { validateMiddleware } from 'middlewares';

import { signUp } from './account';

import { signUpValidators } from './validators';

const accountRouter = new Router();

accountRouter.post(Constants.signupPath, validateMiddleware(signUpValidators), signUp);

export { accountRouter };
