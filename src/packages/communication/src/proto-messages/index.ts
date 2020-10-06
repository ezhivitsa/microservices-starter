import { AuthorizationCommand, authorizationCommandSchemas } from './authorization';
import { UserEvent, userEventSchemas } from './users';

import { ChannelCommandSchema } from '../messages/command';
import { ChannelEventSchema } from '../messages/event';

export { Result, ProtoMessage, ProtoRoot } from '../messages/proto';

export type Command = AuthorizationCommand;

export type Event = UserEvent;

export const commandSchemas: Record<Command, ChannelCommandSchema> = {
  ...authorizationCommandSchemas,
};

export const eventSchemas: Record<Event, ChannelEventSchema> = {
  ...userEventSchemas,
};
