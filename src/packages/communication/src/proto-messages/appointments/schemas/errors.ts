import * as AppointmentTypes from '../types';
import { root } from './root';

export const error = root.loadProtoMessage<AppointmentTypes.Error>('microservices_starter.appointments.errors.Error');
