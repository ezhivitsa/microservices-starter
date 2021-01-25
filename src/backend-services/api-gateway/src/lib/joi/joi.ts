import { Schema, ValidationOptions, ValidationError } from 'joi';
import _ from 'lodash';

export interface ValidateResult<V> {
  value: V;
  error?: ValidationError;
}

const joiOptions: ValidationOptions = {
  abortEarly: false,
  allowUnknown: true,
  stripUnknown: {
    objects: true,
  },
};

export const validate = _.curry(
  <V>(schema: Schema, payload: V): ValidateResult<V> => {
    const { error, value } = schema.validate(payload, joiOptions);

    return {
      error,
      value,
    };
  },
);
