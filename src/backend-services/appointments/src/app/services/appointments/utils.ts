import { Metadata, AggregateEventMetadata } from './types';

export function getEventMetadata(meta: Metadata): AggregateEventMetadata {
  return {
    createdAt: new Date(),
    userId: meta.user?.id,
  };
}
