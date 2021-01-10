import { Channel } from '../../channels';

import { Version } from '../types';
import { ProtoMessage } from '../proto';
import { getChannelKey } from '../utils';

import { CommandSchema, ChannelCommandSchema } from './types';

export function getChannelCommands<T extends string>(
  channel: Channel,
  commandSchemas: CommandSchema<T>[],
  version: Version,
  channelErrorSchema?: ProtoMessage<any>,
): Record<string, ChannelCommandSchema> {
  const result: Record<string, ChannelCommandSchema> = {};

  commandSchemas.forEach(({ command, requestSchema, responseSchema, errorSchema }) => {
    result[getChannelKey(command, version)] = {
      requestSchema,
      responseSchema,
      errorSchema: errorSchema || channelErrorSchema,
      channel,
    };
  });

  return result;
}
