# Communication package
 
Package to work with commands and events which encapsulates all work with kafka and provides simple clients to send and receive data.

## Kafka

Class that receives configurations for `kafka`, `producers` and `consumers` and return instance that gives ability to send commands, replies, events and handle them.

[Kafka API Reference](./KAFKA_API.md).

## Messages

In this package we store protobuf messages for commands and event in directory [messages](./messages) and we have written typescript types fro this messages in [src/proto-messages]('./src/proto-messages).

[Messages documentation](./MESSAGES.md).

## Saga

Also we have implemented pattern [saga](https://microservices.io/patterns/data/saga.html) to have ability to set up chains of commands and specify compensation transactions for them.

[Saga API Reference](./SAGA_API.md).

### Saga example

```javascript
import { Saga } from '@packages/communication';

export class RegisterSagaState {
  private _authData?: AuthProviderTypes.RegisterResult;

  constructor(private _data: RegisterParams) {}

  authRegister = async (metadata: ServiceMetadata): Promise<void> => {
    // ...
  };

  cancelAuthRegister = async (metadata: ServiceMetadata): Promise<void> => {
    // ...
  };

  usersRegister = async (metadata: ServiceMetadata): Promise<void> => {
    // ...
  };

  sendSignupEmail = async (metadata: ServiceMetadata): Promise<void> => {
    // ...
  };
}

export class RegisterSaga extends Saga<ServiceMetadata> {
  constructor(state: RegisterSagaState) {
    super();

    this._sagaDefinition = this.step()
      .invokeParticipant(state.authRegister)
      .withCompensation(state.cancelAuthRegister)

      .step()
      .invokeParticipant(state.usersRegister)

      .step()
      .invokeParticipant(state.sendSignupEmail)

      .build();
  }
}

// ...

const state = new RegisterSagaState(params);
const registerSaga = new RegisterSaga(state);

await registerSaga.start(metadata);
```
