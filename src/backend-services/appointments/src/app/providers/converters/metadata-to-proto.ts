import { CommonTypes } from '@packages/communication';
import { castDateToTimestamp } from '@packages/proto';

import { ProviderTypes } from '@root/providers';

export function mapEventMetadataToProto(meta: ProviderTypes.EventMetadata): CommonTypes.EventMeta {
  const { createdAt, userId } = meta;

  return {
    createdAt: castDateToTimestamp(createdAt),
    userId,
  };
}
