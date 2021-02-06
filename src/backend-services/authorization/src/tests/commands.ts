import { AuthorizationClient, AuthorizationTypes, Version } from '@packages/communication';

import { kafka } from '@root/lib/kafka';

const authorizationClient = new AuthorizationClient(kafka);

export function register(
  data: AuthorizationTypes.RegistrationRequest,
): Promise<AuthorizationTypes.RegistrationResponse> {
  return authorizationClient.registrationCommand(data, {
    requestId: '1',
    version: Version.v1,
    responseChannel: 'response',
  });
}

export function verifyEmail(data: AuthorizationTypes.VerifyEmailRequest): Promise<void> {
  return authorizationClient.verifyEmailCommand(data, {
    requestId: '1',
    version: Version.v1,
    responseChannel: 'response',
  });
}
