import * as UserTypes from '../types';
import { root } from './root';

export const registrationRequest = root.loadProtoMessage<UserTypes.RegistrationRequest>(
  'microservices_starter.users.user.RegistrationRequest',
);

export const getUserByAuthIdRequest = root.loadProtoMessage<UserTypes.GetUserByAuthIdRequest>(
  'microservices_starter.users.user.GetUserByAuthIdRequest',
);

export const getUserByAuthIdResponse = root.loadProtoMessage<UserTypes.GetUserByAuthIdResponse>(
  'microservices_starter.users.user.GetUserByAuthIdResponse',
);

export const userCreatedEvent = root.loadProtoMessage<UserTypes.UserCreatedEvent>(
  'microservices_starter.users.user.UserCreatedEvent',
);
