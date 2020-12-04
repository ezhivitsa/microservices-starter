import { AuthorizationCommand, authorizationCommandSchemas, AuthorizationTypes } from './authorization';
import { UserEvent, userEventSchemas, UserTypes } from './users';
import { CommonTypes, CommonSchemas } from './common';
import { ErrorCode } from './common/types';

import { ChannelCommandSchema, ChannelEventSchema } from '../messages';

export type Command = AuthorizationCommand;

export type Event = UserEvent;

export type ErrorData = CommonTypes.Error;

export const commandSchemas: Record<string, ChannelCommandSchema> = {
  ...authorizationCommandSchemas,
};

export const eventSchemas: Record<string, ChannelEventSchema> = {
  ...userEventSchemas,
};

export const errorSchema = CommonSchemas.error;

export { AuthorizationCommand, UserEvent, AuthorizationTypes, UserTypes, ErrorCode };
