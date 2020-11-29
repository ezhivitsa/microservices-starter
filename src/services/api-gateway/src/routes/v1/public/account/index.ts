import Router from '@koa/router';

import { Constants } from '@packages/common';

import { validateMiddleware } from 'middlewares';

import { signUp, signIn } from './account';

import { signUpValidators, signInValidators } from './validators';

const accountRouter = new Router();

accountRouter.post(Constants.signupPath, validateMiddleware(signUpValidators), signUp);
accountRouter.post(Constants.signinPath, validateMiddleware(signInValidators), signIn);

export { accountRouter };
