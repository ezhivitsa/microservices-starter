import { Timestamp } from '../../google';

// GetSchedule
export interface GetScheduleRequest {
  from?: Timestamp;
  to?: Timestamp;
}

export interface Appointment {
  id?: string;
  start?: Timestamp;
  end?: Timestamp;
  description?: string;
  userId?: string;
  firstName?: string;
  lastName?: string;
}

export interface GetScheduleResponse {
  appointments?: Appointment[];
}
