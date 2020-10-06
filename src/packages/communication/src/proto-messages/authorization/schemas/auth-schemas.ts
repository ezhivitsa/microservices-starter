import * as AuthorizationTypes from '../types';
import { root } from './root';

export const registrationRequest = root.loadProtoMessage<AuthorizationTypes.RegistrationRequest>(
  'microservices_starter.authorization.auth.RegistrationRequest',
);

export const registrationResponse = root.loadProtoMessage<AuthorizationTypes.RegistrationResponse>(
  'microservices_starter.authorization.auth.RegistrationResponse',
);
