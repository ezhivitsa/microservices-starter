import { RouterAppMiddleware, RouterAppContext, Next } from 'koa';

import { Symbols, ValidatorType, validate } from 'lib/validate';

interface ValidateOptions {
  throwOnInvalid?: boolean;
}

const defaultOptions = {
  throwOnInvalid: true,
};

export const validateMiddleware = (
  validators: ValidatorType<any> | ValidatorType<any>[] = [],
  options: ValidateOptions = defaultOptions,
): RouterAppMiddleware => async (ctx: RouterAppContext, next: Next): Promise<void> => {
  const { throwOnInvalid } = {
    ...defaultOptions,
    ...options,
  };

  const payload = {
    ...ctx.request.body,
    ...ctx.query,
    ...ctx.params,
    [Symbols.PERSISTENT]: ctx,
  };

  const result = await validate(payload, validators);

  if (throwOnInvalid && result.errors.length) {
    ctx.body = {
      errors: result.errors,
    };

    ctx.throw(400);
  }

  ctx.state.validatedRequest = result;
  await next();
};
