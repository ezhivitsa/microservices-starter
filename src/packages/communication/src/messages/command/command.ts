import { Channel } from '../../channels';

import { CommandSchema, ChannelCommandSchema } from './types';

export function getChannelCommands<T extends string>(
  channel: Channel,
  commandSchemas: Record<string, CommandSchema>,
): Record<T, ChannelCommandSchema> {
  return Object.keys(commandSchemas).reduce<Record<string, ChannelCommandSchema>>((result, commandKey) => {
    result[commandKey] = {
      ...commandSchemas[commandKey],
      channel,
    };

    return result;
  }, {});
}
