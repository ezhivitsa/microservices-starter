import { equal } from 'joi';
import { RouterAppContext } from 'koa';

import { validate, Symbols } from './validate';

describe('validator', () => {
  it("should return '{ errors: [], payload }' with empty validators array", async () => {
    const validationResult = await validate(
      {
        [Symbols.PERSISTENT]: {} as RouterAppContext,
      },
      [],
    );
    expect(validationResult).toMatchObject({
      errors: {},
      value: {},
    });
  });

  it('should return the value from the last validator', async () => {
    const validators = [() => ({ errors: {}, value: { data: 1 } }), () => ({ errors: {}, value: { data: 2 } })];

    const validationResult = await validate(
      {
        data: 100,
        [Symbols.PERSISTENT]: {} as RouterAppContext,
      },
      validators,
    );
    expect(validationResult).toMatchObject({
      errors: {},
      value: { data: 2 },
    });
  });

  it('should skip validators after errors appeared', async () => {
    const validators = [
      () => ({ value: { data: 1 }, errors: {} }),
      () => ({ value: { data: 2 }, errors: { data: 'Errors was appear' } }),
      () => ({ value: { data: 3 }, errors: {} }),
    ];

    const validationResult = await validate(
      {
        data: 100,
        [Symbols.PERSISTENT]: {} as RouterAppContext,
      },
      validators,
    );
    expect(validationResult).toMatchObject({
      errors: { data: 'Errors was appear' },
      value: { data: 2 },
    });
  });

  it('should apply persistent data to each validator', async () => {
    const persistentData = {
      persistant: 'Wow! persistent!',
    };

    const payload = {
      data: 0,
      [Symbols.PERSISTENT]: (persistentData as unknown) as RouterAppContext,
    };

    const validators = [
      (_: any, persistent: any) => {
        expect(persistent).toMatchObject(persistentData);
        return {
          errors: {},
          value: { data: 1 },
        };
      },
      (_: any, persist: any) => {
        expect(persist).toMatchObject(persistentData);
        return {
          errors: {},
          value: { data: 2 },
        };
      },
    ];

    const validationResult = await validate(payload, validators);
    expect(validationResult).toMatchObject({
      errors: {},
      value: { data: 2 },
    });
  });
});
