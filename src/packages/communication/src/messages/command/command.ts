import { Channel } from '../../channels';

import { Version } from '../types';
import { getChannelKey } from '../utils';

import { CommandSchema, ChannelCommandSchema } from './types';

export function getChannelCommands<T extends string>(
  channel: Channel,
  commandSchemas: CommandSchema<T>[],
  version: Version,
): Record<string, ChannelCommandSchema> {
  const result: Record<string, ChannelCommandSchema> = {};

  commandSchemas.forEach(({ command, requestSchema, responseSchema }) => {
    result[getChannelKey(command, version)] = {
      requestSchema,
      responseSchema,
      channel,
    };
  });

  return result;
}
