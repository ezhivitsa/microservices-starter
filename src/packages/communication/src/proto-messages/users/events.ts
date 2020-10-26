import * as UserSchemas from './schemas';

import { getChannelEvents, ChannelEventSchema, EventKey, Version } from '../../messages';
import { Channel } from '../../channels';

export enum UserEvent {
  UserCreated = 'user-created',
}

export const userEventSchemas: Map<EventKey<UserEvent>, ChannelEventSchema> = getChannelEvents(
  Channel.AUTHORIZATION,
  [
    {
      event: UserEvent.UserCreated,
      schema: UserSchemas.userCreatedEvent,
    },
  ],
  Version.v1,
);
