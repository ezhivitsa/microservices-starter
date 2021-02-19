# Koa-kafka package

Framework that is similar to koa in usage but to work with kafka instead of http(s). In particular this package is optimized to work with `@packages/communication` package and handle commands and events that are created in `@packages/communication`.

This package provides the following possibilities:
1. Use middlewares in a similar way like in `koa`
2. Handle commands and events
3. Store in context data from command or event
4. Validate data in commands
5. Handle all errors in middlewares and handlers like in `koa`

## Api

### constructor(kafka, channel, options)

Create koa-kafka instance.

#### Arguments:
- `kafka` - *(Kafka)* kafka instance from `@packages/communication` package
- `channel` - *(Channel)* channel from `@packages/communication` to handle commands and send replies.
- `options` - *(Object)* options for koa-kafka
  - `badProtoCode` - *(number)* error code that will be sent if will arise error in parsing proto
  - `validationFailedCode` - *(number)* error code that will be sent if receive joi validation error
  - `uniqModel` - *(Object)* optional model for validating that command or event is unique and doesn't handled before
    - `conflictCode` - *(number)* error code which is used if we have conflicting command or error 
    - `saveId` - *(id: string) => Promise<void>* method for saving id of the command/event
    - `isUniqId` - *(id: string) => Promise<boolean>* method for validating that id of command/event is unique

### use(middleware)

Add middleware to the chain of middlewares.

#### Arguments:
- `middleware` - *(ctx: Context, next: Next) => Promise<void>* middleware that will be work for every request

### handleCommand(commandData)

Add handler for command

#### Arguments:
- `commandData` - *(Object)* handle command options
  - `version` - *(Version)* version of the command
  - `command` - *(Command)* command to handle
  - `schema` - *(ObjectSchema)* optional [joi](https://github.com/sideway/joi) schema to validate command data
  - `handler` - *(ctx: Context, next: Next) => Promise<void>* command handler
  - `validateUniq` - *boolean* optional flag indicating need to validate that command has never been processed previously


### handleEvent(eventData)

Add handler for event

#### Arguments:
- `eventData` - *(Object)* handle event options
  - `version` - *(Version)* version of the event
  - `event` - *(Event)* event to handle
  - `channel` - *(Channel)* channel from `@packages/communication` to handle events
  - `handler` - *(ctx: Context, next: Next) => Promise<void>* event handler

### listen(callback)

Start listening kafka messages

#### Arguments:
- `callback` - *(Function)* optional function which is called when start listening messages

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
  })
  .listen();

```
