import { Channel } from '../../channels';

import { EventSchema, ChannelEventSchema } from './types';

export function getChannelEvents<T extends string>(
  channel: Channel,
  eventSchemas: Record<string, EventSchema>,
): Record<T, ChannelEventSchema> {
  return Object.keys(eventSchemas).reduce<Record<string, ChannelEventSchema>>((result, eventKey) => {
    result[eventKey] = {
      ...eventSchemas[eventKey],
      channel,
    };

    return result;
  }, {});
}
