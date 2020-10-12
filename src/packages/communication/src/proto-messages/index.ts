import { AuthorizationCommand, authorizationCommandSchemas } from './authorization';
import { UserEvent, userEventSchemas } from './users';

import { ChannelCommandSchema, ChannelEventSchema } from '../messages';

export type Command = AuthorizationCommand;

export type Event = UserEvent;

export const commandSchemas: Record<Command, ChannelCommandSchema> = {
  ...authorizationCommandSchemas,
};

export const eventSchemas: Record<Event, ChannelEventSchema> = {
  ...userEventSchemas,
};
