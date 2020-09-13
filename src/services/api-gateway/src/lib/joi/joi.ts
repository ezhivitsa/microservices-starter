import { Schema, ValidationOptions, ValidationError } from 'joi';
import _ from 'lodash';

interface ErrorMessage {
  message: string;
  type: string;
}

interface ErrorData {
  messages: ErrorMessage[];
  path: (string | number)[];
}

type ErrorResult = Record<string, ErrorData>;

interface ValidateCurryResult<V> {
  value: V;
  errors: ErrorResult;
}

const joiOptions: ValidationOptions = {
  abortEarly: false,
  allowUnknown: true,
  stripUnknown: {
    objects: true,
  },
};

/**
 * Parse and return errors
 */
const parseJoiErrors = (joiError?: ValidationError): ErrorResult => {
  const resultErrors: ErrorResult = {};

  if (joiError && _.isArray(joiError.details)) {
    joiError.details.forEach((error) => {
      const { path, context, message, type } = error;
      if (!context || !context.label) {
        return;
      }

      if (!resultErrors[context.label]) {
        resultErrors[context.label] = {
          path,
          messages: [],
        };
      }

      resultErrors[context.label].messages.push({
        message,
        type,
      });
    });
  }

  return resultErrors;
};

export const validate = _.curry(
  <V>(schema: Schema, payload: V): ValidateCurryResult<V> => {
    const { error, value } = schema.validate(payload, joiOptions);

    return {
      errors: parseJoiErrors(error),
      value,
    };
  },
);
