import { Kafka } from '../kafka';
import { UserTypes, UserEvent } from '../proto-messages';

import { EventMetadata } from './types';

export class UsersClient {
  constructor(private _kafka: Kafka) {}

  userCreatedEvent(data: UserTypes.UserCreatedEvent, metadata: EventMetadata): void {
    this._kafka.sendEvent(
      {
        data,
        event: UserEvent.UserCreated,
      },
      metadata,
    );
  }
}
