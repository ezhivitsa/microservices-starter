import { Channel } from '../../channels';

import { ProtoMessage } from '../proto';
import { Version } from '../types';
import { getChannelKey } from '../utils';

import { CommandSchema, ChannelCommandSchema } from './types';

export function getChannelCommands<T extends string>(
  channel: Channel,
  commandSchemas: CommandSchema<T>[],
  version: Version,
  errorSchema?: ProtoMessage<any>,
): Record<string, ChannelCommandSchema> {
  const result: Record<string, ChannelCommandSchema> = {};

  commandSchemas.forEach(({ command, requestSchema, responseSchema }) => {
    result[getChannelKey(command, version)] = {
      requestSchema,
      responseSchema,
      errorSchema,
      channel,
    };
  });

  return result;
}
