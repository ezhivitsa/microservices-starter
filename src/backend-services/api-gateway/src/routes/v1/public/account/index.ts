import { AppKoaState, AppKoaContext } from 'koa';
import Router from '@koa/router';

import { Constants } from '@packages/common';

import { validateMiddleware } from 'middlewares';

import { signUpValidators, signInValidators, verifyEmailValidators, resendVerifyEmailValidators } from './validators';
import { signUpHandler, signInHandler, verifyEmailHandler, resendVerifyEmailHandler } from './handlers';

const accountRouter = new Router<AppKoaState, AppKoaContext>();

accountRouter
  .post(Constants.signupPath, validateMiddleware(signUpValidators), signUpHandler)
  .post(Constants.signinPath, validateMiddleware(signInValidators), signInHandler)
  .post(Constants.verifyEmailPath, validateMiddleware(verifyEmailValidators), verifyEmailHandler)
  .post(Constants.resendVerifyEmailPath, validateMiddleware(resendVerifyEmailValidators), resendVerifyEmailHandler);

export { accountRouter };
