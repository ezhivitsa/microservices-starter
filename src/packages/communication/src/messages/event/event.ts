import { Version } from '../types';

import { Channel } from '../../channels';
import { getChannelKey } from '../utils';

import { EventSchema, ChannelEventSchema } from './types';

export function getChannelEvents<T extends string>(
  channel: Channel,
  eventSchemas: EventSchema<T>[],
  version: Version,
): Record<string, ChannelEventSchema> {
  const result: Record<string, ChannelEventSchema> = {};

  eventSchemas.forEach(({ event, schema }) => {
    result[getChannelKey(event, version)] = { channel, schema };
  });

  return result;
}
