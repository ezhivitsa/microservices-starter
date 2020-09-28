import { AuthorizationCommand, authorizationCommandSchemas } from './authorization';
import { ChannelCommandSchema } from './command';

export { Result, ProtoMessage, ProtoRoot } from './proto';

export type Command = AuthorizationCommand;

export const commandSchemas: Record<Command, ChannelCommandSchema> = {
  ...authorizationCommandSchemas,
};
