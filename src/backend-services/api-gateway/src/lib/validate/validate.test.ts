import { RouterAppContext } from 'koa';

import { validate, Symbols } from './validate';

function getObjectValue(obj: Record<string, any>): Record<string, any> {
  const value: Record<string, any> = {};
  Object.entries(obj).forEach(([key, val]) => {
    value[key] = val;
  });

  return value;
}

describe('validator', () => {
  it('should return result with empty validators array', async () => {
    const validationResult = await validate(
      {
        [Symbols.PERSISTENT]: {} as RouterAppContext,
      },
      [],
    );

    const value = getObjectValue(validationResult.value as Record<string, any>);
    expect(validationResult.error).toBeUndefined();
    expect(value).toMatchObject({});
  });

  it('should return the value from the last validator', async () => {
    const validators = [() => ({ value: { data: 1 } }), () => ({ value: { data: 2 } })];
    const validationResult = await validate(
      {
        data: 100,
        [Symbols.PERSISTENT]: {} as RouterAppContext,
      },
      validators,
    );

    const value = getObjectValue(validationResult.value as Record<string, any>);
    expect(value).toMatchObject({ data: 2 });
  });

  it('should skip validators after errors appeared', async () => {
    const validators = [
      () => ({ value: { data: 1 } }),
      () => ({ value: { data: 2 }, error: { data: 'Errors was appear' } }),
      () => ({ value: { data: 3 }, error: {} }),
    ];
    const validationResult = await validate(
      {
        data: 100,
        [Symbols.PERSISTENT]: {} as RouterAppContext,
      },
      validators,
    );

    const value = getObjectValue(validationResult.value as Record<string, any>);

    expect(validationResult.error).toMatchObject({ data: 'Errors was appear' });
    expect(value).toMatchObject({ data: 2 });
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
          value: { data: 1 },
        };
      },
      (_: any, persist: any) => {
        expect(persist).toMatchObject(persistentData);
        return {
          value: { data: 2 },
        };
      },
    ];
    const validationResult = await validate(payload, validators);

    const value = getObjectValue(validationResult.value as Record<string, any>);

    expect(value).toMatchObject({ data: 2 });
  });
});
