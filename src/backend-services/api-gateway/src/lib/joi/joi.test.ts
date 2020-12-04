import Joi from 'joi';

import { validate } from './joi';

describe('joi validator', () => {
  it('should apply args partially', () => {
    const schema = Joi.object({
      email: Joi.string(),
    });
    const validationResult = validate(schema, {
      email: 'test@test.com',
    });

    const validationResultPartial = validate(schema)({
      email: 'test@test.com',
    });

    expect(validationResult).toMatchObject(validationResultPartial);

    expect(validationResult).toMatchObject({
      errors: {},
      value: {
        email: 'test@test.com',
      },
    });
  });
});
