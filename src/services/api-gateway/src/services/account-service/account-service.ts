import { AuthorizationCommand } from '@packages/communication';

import { kafka } from 'lib/kafka';

import { ServiceMetadata } from '../types';
import { RegisterRequest, RegisterResponse } from './types';

export async function register(data: RegisterRequest, metadata: ServiceMetadata): Promise<RegisterResponse> {
  kafka.sendCommand(
    {
      data,
      command: AuthorizationCommand.Registration,
    },
    metadata,
  );
}
