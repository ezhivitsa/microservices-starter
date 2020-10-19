import { Kafka } from '../kafka';
import { UserTypes, UserEvent } from '../proto-messages';

export class UsersProvider {
  constructor(private _kafka: Kafka) {}

  userCreatedEvent(data: UserTypes.UserCreatedEvent): void {
    this._kafka.sendEvent({
      data,
      event: UserEvent.UserCreated,
    });
  }
}
