import * as UserTypes from '../types';
import { root } from './root';

export const registrationRequest = root.loadProtoMessage<UserTypes.RegistrationRequest>(
  'microservices_starter.users.user.RegistrationRequest',
);

export const getCurrentUserRequest = root.loadProtoMessage<UserTypes.GetCurrentUserRequest>(
  'microservices_starter.users.user.GetCurrentUserRequest',
);

export const getCurrentUserResponse = root.loadProtoMessage<UserTypes.GetCurrentUserResponse>(
  'microservices_starter.users.user.GetCurrentUserResponse',
);

export const userCreatedEvent = root.loadProtoMessage<UserTypes.UserCreatedEvent>(
  'microservices_starter.users.user.UserCreatedEvent',
);
