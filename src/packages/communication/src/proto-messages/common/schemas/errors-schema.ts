import * as AuthorizationTypes from '../types';
import { root } from './root';

export const error = root.loadProtoMessage<AuthorizationTypes.Error>('microservices_starter.common.errors.Error');
