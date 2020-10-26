import { Channel } from '../../channels';

import { ProtoMessage } from '../proto';
import { Version } from '../types';

import { CommandSchema, ChannelCommandSchema, CommandKey } from './types';

export function getChannelCommands<T extends string>(
  channel: Channel,
  commandSchemas: CommandSchema<T>[],
  version: Version,
  errorSchema?: ProtoMessage<any>,
): Map<CommandKey<T>, ChannelCommandSchema> {
  const result = new Map<CommandKey<T>, ChannelCommandSchema>();

  commandSchemas.forEach(({ command, requestSchema, responseSchema }) => {
    result.set(
      { command, version },
      {
        requestSchema,
        responseSchema,
        errorSchema,
        channel,
      },
    );
  });

  return result;
}
