import { AppKoaState, AppKoaContext } from 'koa';
import Router from '@koa/router';

import { Constants } from '@packages/common';

import { validateMiddleware } from 'middlewares';

import { signUpValidators, signInValidators, verifyEmailValidators } from './validators';
import { signUpHandler, signInHandler, verifyEmailHandler } from './handlers';

const accountRouter = new Router<AppKoaState, AppKoaContext>();

accountRouter.post(Constants.signupPath, validateMiddleware(signUpValidators), signUpHandler);
accountRouter.post(Constants.signinPath, validateMiddleware(signInValidators), signInHandler);
accountRouter.post(Constants.verifyEmailPath, validateMiddleware(verifyEmailValidators), verifyEmailHandler);

export { accountRouter };
