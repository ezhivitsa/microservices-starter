import { AuthorizationCommand, authorizationCommandSchemas, AuthorizationTypes } from './authorization';
import { UserCommand, UserEvent, userCommandSchemas, userEventSchemas, UserTypes } from './users';

import { ChannelCommandSchema, ChannelEventSchema } from '../messages';

export type Command = AuthorizationCommand | UserCommand;

export type Event = UserEvent;

export const commandSchemas: Record<string, ChannelCommandSchema> = {
  ...authorizationCommandSchemas,
  ...userCommandSchemas,
};

export const eventSchemas: Record<string, ChannelEventSchema> = {
  ...userEventSchemas,
};

export { AuthorizationCommand, UserCommand, UserEvent, AuthorizationTypes, UserTypes };
