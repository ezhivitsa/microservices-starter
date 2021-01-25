import { RouterAppContext } from 'koa';
import _ from 'lodash';

import { ValidateResult } from 'lib/joi';

export type ValidatorType<D> = (data: D, ctx: RouterAppContext) => ValidateResult<D> | Promise<ValidateResult<D>>;

const PERSISTENT: unique symbol = Symbol('persistent');

function getValidators<D>(validators: ValidatorType<D> | ValidatorType<D>[] = []): ValidatorType<D>[] {
  if (_.isFunction(validators)) {
    return [validators];
  }

  if (!Array.isArray(validators) || !validators.every(_.isFunction)) {
    throw Error('Validators must be a function or array of functions');
  }

  return validators;
}

export async function validate<P>(
  payload: P & { [PERSISTENT]: RouterAppContext },
  validators: ValidatorType<P> | ValidatorType<P>[] = [],
): Promise<ValidateResult<P>> {
  const ctx = payload[Symbols.PERSISTENT];

  const validatorsList = getValidators(validators);
  const result: ValidateResult<P> = {
    value: payload,
  };

  for (let i = 0; i < validatorsList.length; i += 1) {
    const validator = validatorsList[i];
    const { error, value } = await validator(result.value, ctx);

    result.error = error;
    result.value = value;

    if (error) {
      return result;
    }
  }

  return result;
}

export const Symbols = {
  PERSISTENT,
} as const;
