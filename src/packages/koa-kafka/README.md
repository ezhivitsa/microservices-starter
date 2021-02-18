# Koa-kafka package

Framework that is similar to koa in usage but to work with kafka instead of http(s). In particular this package is optimized to work with `@packages/communication` package and handle commands and events that are created in `@packages/communication`.

This package provides the following possibilities:
1. Use middlewares in a similar way like in `koa`
2. Handle commands and events
3. Store in context data from command or event
4. Validate data in commands
5. Handle all errors in middlewares and handlers like in `koa`

## Api

## Basic example

```javascript
import { KoaKafka, Version, Context } from '@packages/koa-kafka';

const app = new KoaKafka(kafka, Channel.USERS, {
  badProtoCode: UserTypes.ErrorCode.BadProto,
  validationFailedCode: UserTypes.ErrorCode.ValidationFailed,
  uniqModel,
});

app
  .use(async (ctx: Context, next: Next) => {
    try {
      await next();
    } catch (err) {
      console.error(err);
    }
  })
  .use(middlewares.logRequestMiddleware)
  .handleCommand({
    version: Version.v1,
    command: UserCommand.Registration,
    schema: registrationSchema,
    handler: signUpHandler,
    validateUniq: true,
  });

```
