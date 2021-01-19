import { AuthorizationCommand, authorizationCommandSchemas, AuthorizationTypes } from './authorization';
import { UserCommand, UserEvent, userCommandSchemas, userEventSchemas, UserTypes } from './users';
import { EmailCommand, emailCommandSchemas, EmailTypes } from './email';
import { CommonTypes } from './common';

import { ChannelCommandSchema, ChannelEventSchema } from '../messages';

export type Command = AuthorizationCommand | UserCommand | EmailCommand;

export type Event = UserEvent;

export const commandSchemas: Record<string, ChannelCommandSchema> = {
  ...authorizationCommandSchemas,
  ...userCommandSchemas,
  ...emailCommandSchemas,
};

export const eventSchemas: Record<string, ChannelEventSchema> = {
  ...userEventSchemas,
};

export {
  AuthorizationCommand,
  UserCommand,
  UserEvent,
  AuthorizationTypes,
  UserTypes,
  CommonTypes,
  EmailCommand,
  EmailTypes,
};
