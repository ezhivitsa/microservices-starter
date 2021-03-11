import * as UserSchemas from './schemas';

import { getChannelEvents, ChannelEventSchema, Version } from '../../messages';
import { Channel } from '../../channels';

export enum UserEvent {
  UserCreated = 'user-created',
  UserUpdated = 'user-updated',
}

export const userEventSchemas: Record<string, ChannelEventSchema> = getChannelEvents(
  Channel.Users,
  [
    {
      event: UserEvent.UserCreated,
      schema: UserSchemas.userCreatedEvent,
    },
    {
      event: UserEvent.UserUpdated,
      schema: UserSchemas.userUpdatedEvent,
    },
  ],
  Version.v1,
);
