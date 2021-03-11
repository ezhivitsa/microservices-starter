import * as UsersTypes from '../types';
import { root } from './root';

export const error = root.loadProtoMessage<UsersTypes.Error>('microservices_starter.schedule.errors.Error');
