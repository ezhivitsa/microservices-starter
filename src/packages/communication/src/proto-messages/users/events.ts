import * as UserSchemas from './schemas';

import { getChannelEvents, ChannelEventSchema, Version } from '../../messages';
import { Channel } from '../../channels';

export enum UserEvent {
  UserCreated = 'user-created',
}

export const userEventSchemas: Record<string, ChannelEventSchema> = getChannelEvents(
  Channel.AUTHORIZATION,
  [
    {
      event: UserEvent.UserCreated,
      schema: UserSchemas.userCreatedEvent,
    },
  ],
  Version.v1,
);
