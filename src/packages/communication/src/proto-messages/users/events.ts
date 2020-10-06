import * as UserSchemas from './schemas';

import { getChannelEvents, ChannelEventSchema } from '../../messages/event';
import { Channel } from '../../channels';

export enum UserEvent {
  UserCreated = 'user-created',
}

export const userEventSchemas: Record<UserEvent, ChannelEventSchema> = getChannelEvents(Channel.AUTHORIZATION, {
  [UserEvent.UserCreated]: {
    schema: UserSchemas.userCreatedEvent,
  },
});
