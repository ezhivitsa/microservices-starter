# KAFKA API Reference

### constructor(config, consumerConfig, [producerConfig])

Create kafka instance

#### Arguments
- `config` - *(Object)* `KafkaConfig` from [kafkajs](https://kafka.js.org/docs/configuration) with additional 2 fields
  - `mock` - *(boolean)* optional field indicating whether we need initialize mock kafka or not
  - `applicationId` - *(string)* optional field which is required to initialize response channel for concrete instance of the application. If is not specified we use `uuid` to generate unique id for every instance of the application
- `consumerConfig` - *(Object)* `ConsumerConfig` from [kafkajs](https://kafka.js.org/docs/configuration)
- `producerConfig` - *(Object)* optional `ProducerConfig` from [kafkajs](https://kafka.js.org/docs/configuration)

### sendCommand(commandData, metadata)

Send command to kafka. Returns promise with reply result.

#### Arguments

- `commandData` - *(Object)* command data
  - `data` - data that will be encoded with protobuf and sent to kafka
  - `channel` - *(Channel)* channel to send command
  - `command` - *(Command)* command
- `metadata` - *(Object)* command metadata
  - `requestId` - *(string)* id of the request which is generated in the api gateway and the same for every command in scope of on api request
  - `version` - *(Version)* version of the command
  - `user` - *(Object)* optional object with information about current user (if authorized)
    - `id` - *(string)* user id
    - `roles` - *(Role[])* - list of user roles

### sendReply(replyData, metadata)

Sent reply to command

#### Arguments

- `replyData` - *(Object)* reply data
  - `data` - reply data
  - `channel` - *(Channel)* channel to send reply to command
  - `command` - *(Command)* original command
  - `correlationId` - *(string)* id of the original command
- `metadata`
  - `requestId` - *(string)* id of the request which is generated in the api gateway
  - `version` - *(Version)* version of the command
  - `responseChannel` - *(string)* channel to send response to command

### sendReplyError(errorData, metadata)

Send error reply to command

#### Arguments

- `errorData` - *(Object)* error data
  - `data` - error reply data
  - `channel` - *(Channel)* channel to send reply to command
  - `command` - *(Command)* original command
  - `correlationId` - *(string)* id of the original command
- `metadata`
  - `requestId` - *(string)* id of the request which is generated in the api gateway
  - `version` - *(Version)* version of the command
  - `responseChannel` - *(string)* channel to send response to command

### sendEvent(eventData, metadata)

Send event

#### Arguments

- `eventData` - *(Object)* event data
  - `data` - event data
  - `channel` - *(Channel)* channel to send event
  - `event` - *(Event)* event to fire
- `metadata`
  - `version` - *(Version)* version of the event

### handleCommand(channel, command, version)

Add particular command to list of handled commands.

#### Arguments

- `channel` - *(Channel)* channel with command to handle
- `command` - *(Command)* command to handle
- `version` - *(Version)* version of the command

### handleEvent(channel, event, version)

Add particular event to list of handled events.

#### Arguments

- `channel` - *(Channel)* channel with event to handle
- `command` - *(Command)* event to handle
- `version` - *(Version)* version of the event

### listenCommand(callback)

Add callback to handle commands.

#### Arguments

- `callback` - *(commandData) => void* function that is called when the command being processed appears

### listenEvent(callback)

Add callback to handle events.

#### Arguments

- `callback` - *(commandData) => void* function that is called when the event being processed appears

### isHealthy()

Get status whether kafka is healthy. Return promise with boolean result.
