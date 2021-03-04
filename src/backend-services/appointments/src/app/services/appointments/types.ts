import { SessionUser } from '@packages/koa-kafka';
import { AppointmentEvent } from '@packages/communication';

export interface CreateAppointmentParams {
  userId: string;
  start: Date;
  end: Date;
  description?: string;
}

export interface UpdateAppointmentParams {
  id: string;
  start: Date;
  end: Date;
  description?: string;
}

export interface DeleteAppointmentParams {
  id: string;
}

export interface Metadata {
  user?: SessionUser;
}

export type AppointmentCreatedData = CreateAppointmentParams;
export type AppointmentUpdatedData = Omit<UpdateAppointmentParams, 'id'>;

export interface AggregateEventMetadata {
  createdAt: Date;
  userId?: string;
}
export interface AggregateEvent<T extends Record<string, any> = Record<string, any>> {
  type: AppointmentEvent;
  aggregateId: string;
  metadata: AggregateEventMetadata;
  data?: T;
}
