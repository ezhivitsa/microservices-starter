import * as CommonTypes from '../types';
import { root } from './root';

export const error = root.loadProtoMessage<CommonTypes.JoiError>('microservices_starter.common.errors.JoiError');
