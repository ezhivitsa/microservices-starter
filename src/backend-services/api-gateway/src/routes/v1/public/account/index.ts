import { AppKoaState, AppKoaContext } from 'koa';
import Router from '@koa/router';

import { ServerConstants } from '@packages/common';

import { validateMiddleware } from 'middlewares';

import {
  signUpValidators,
  signInValidators,
  verifyEmailValidators,
  resendVerifyEmailValidators,
  forgotPasswordValidators,
  resetPasswordValidators,
} from './validators';
import {
  signUpHandler,
  signInHandler,
  verifyEmailHandler,
  resendVerifyEmailHandler,
  forgotPasswordHandler,
  resetPasswordHandler,
} from './handlers';

const accountRouter = new Router<AppKoaState, AppKoaContext>();

accountRouter
  .post(ServerConstants.signupPath, validateMiddleware(signUpValidators), signUpHandler)
  .post(ServerConstants.signinPath, validateMiddleware(signInValidators), signInHandler)
  .post(ServerConstants.verifyEmailPath, validateMiddleware(verifyEmailValidators), verifyEmailHandler)
  .post(
    ServerConstants.resendVerifyEmailPath,
    validateMiddleware(resendVerifyEmailValidators),
    resendVerifyEmailHandler,
  )
  .post(ServerConstants.forgotPasswordPath, validateMiddleware(forgotPasswordValidators), forgotPasswordHandler)
  .post(ServerConstants.resetPasswordPath, validateMiddleware(resetPasswordValidators), resetPasswordHandler);

export { accountRouter };
