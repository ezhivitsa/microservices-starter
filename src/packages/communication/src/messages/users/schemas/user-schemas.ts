import * as UserTypes from '../types';
import { root } from './root';

export const userCreatedEvent = root.loadProtoMessage<UserTypes.UserCreatedEvent>(
  'microservices_starter.users.user.UserCreatedEvent',
);
