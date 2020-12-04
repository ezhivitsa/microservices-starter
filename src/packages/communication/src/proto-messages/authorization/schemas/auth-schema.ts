import * as AuthorizationTypes from '../types';
import { root } from './root';

export const registrationRequest = root.loadProtoMessage<AuthorizationTypes.RegistrationRequest>(
  'microservices_starter.authorization.auth.RegistrationRequest',
);

export const registrationResponse = root.loadProtoMessage<AuthorizationTypes.RegistrationResponse>(
  'microservices_starter.authorization.auth.RegistrationResponse',
);

export const signInRequest = root.loadProtoMessage<AuthorizationTypes.SignInRequest>(
  'microservices_starter.authorization.auth.SignInRequest',
);

export const signInResponse = root.loadProtoMessage<AuthorizationTypes.SignInResponse>(
  'microservices_starter.authorization.auth.SignInResponse',
);
