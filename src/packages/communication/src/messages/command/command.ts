import { Channel } from '../../channels';

import { ProtoMessage } from '../proto';

import { CommandSchema, ChannelCommandSchema } from './types';

export function getChannelCommands<T extends string>(
  channel: Channel,
  commandSchemas: Record<string, CommandSchema>,
  errorSchema?: ProtoMessage<any>,
): Record<T, ChannelCommandSchema> {
  return Object.keys(commandSchemas).reduce<Record<string, ChannelCommandSchema>>((result, commandKey) => {
    result[commandKey] = {
      ...commandSchemas[commandKey],
      channel,
      errorSchema,
    };

    return result;
  }, {});
}
