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

export const updateUserRequest = root.loadProtoMessage<UserTypes.UpdateUserRequest>(
  'microservices_starter.users.user.UpdateUserRequest',
);

export const updateUserResponse = root.loadProtoMessage<UserTypes.UpdateUserResponse>(
  'microservices_starter.users.user.UpdateUserResponse',
);

export const userCreatedEvent = root.loadProtoMessage<UserTypes.UserCreatedEvent>(
  'microservices_starter.users.user.UserCreatedEvent',
);

export const userUpdatedEvent = root.loadProtoMessage<UserTypes.UserUpdatedEvent>(
  'microservices_starter.users.user.UserUpdatedEvent',
);
