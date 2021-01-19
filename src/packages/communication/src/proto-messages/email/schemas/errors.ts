import * as EmailTypes from '../types';
import { root } from './root';

export const error = root.loadProtoMessage<EmailTypes.Error>('microservices_starter.email.errors.Error');
