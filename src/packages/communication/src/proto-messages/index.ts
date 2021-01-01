import { AuthorizationCommand, authorizationCommandSchemas, AuthorizationTypes } from './authorization';
import { UserCommand, UserEvent, userCommandSchemas, userEventSchemas, UserTypes } from './users';
import { CommonTypes, CommonSchemas } from './common';
import { ErrorCode } from './common/types';

import { ChannelCommandSchema, ChannelEventSchema } from '../messages';

export type Command = AuthorizationCommand | UserCommand;

export type Event = UserEvent;

export type ErrorData = CommonTypes.Error;

export const commandSchemas: Record<string, ChannelCommandSchema> = {
  ...authorizationCommandSchemas,
  ...userCommandSchemas,
};

export const eventSchemas: Record<string, ChannelEventSchema> = {
  ...userEventSchemas,
};

export const errorSchema = CommonSchemas.error;

export { AuthorizationCommand, UserCommand, UserEvent, AuthorizationTypes, UserTypes, ErrorCode };
