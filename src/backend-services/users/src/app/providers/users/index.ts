import { usersClient } from '@root/lib/clients';

import { ProviderTypes } from '@root/providers';

import { mapEventMetadataToProto } from '../converters';

import { UserCreatedData, UserUpdatedData } from './types';

export function sendCreatedEvent(
  aggregateId: string,
  data: UserCreatedData,
  metadata: ProviderTypes.EventMetadata,
): void {
  usersClient.userCreatedEvent(
    {
      id: aggregateId,
      ...data,
    },
    mapEventMetadataToProto(metadata),
  );
}

export function sendUpdatedEvent(
  aggregateId: string,
  data: UserUpdatedData,
  metadata: ProviderTypes.EventMetadata,
): void {
  usersClient.userUpdatedEvent(
    {
      id: aggregateId,
      ...data,
    },
    mapEventMetadataToProto(metadata),
  );
}
