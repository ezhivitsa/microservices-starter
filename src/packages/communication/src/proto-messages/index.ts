import { AuthorizationCommand, authorizationCommandSchemas, AuthorizationTypes } from './authorization';
import { UserEvent, userEventSchemas, UserTypes } from './users';

import { ChannelCommandSchema, ChannelEventSchema } from '../messages';

export type Command = AuthorizationCommand;

export type Event = UserEvent;

export const commandSchemas: Record<string, ChannelCommandSchema> = {
  ...authorizationCommandSchemas,
};

export const eventSchemas: Record<string, ChannelEventSchema> = {
  ...userEventSchemas,
};

export { AuthorizationCommand, UserEvent, AuthorizationTypes, UserTypes };
