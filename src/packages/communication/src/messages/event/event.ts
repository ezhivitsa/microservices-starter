import { Version } from '../types';

import { Channel } from '../../channels';

import { EventSchema, ChannelEventSchema, EventKey } from './types';

export function getChannelEvents<T extends string>(
  channel: Channel,
  eventSchemas: EventSchema<T>[],
  version: Version,
): Map<EventKey<T>, ChannelEventSchema> {
  const result = new Map<EventKey<T>, ChannelEventSchema>();

  eventSchemas.forEach(({ event, schema }) => {
    result.set({ event, version }, { channel, schema });
  });

  return result;
}
