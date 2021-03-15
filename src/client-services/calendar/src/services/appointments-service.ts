import { ServiceTypes, ServerConstants } from '@packages/common';

import { api } from './api';

const { versionV1, appointmentsPrefix, appointmentPath } = ServerConstants;

export function getAppointments(
  params: ServiceTypes.GetAppointmentsRequest,
): Promise<ServiceTypes.GetAppointmentsResponse> {
  return api.get(`${versionV1}${appointmentsPrefix}`, params);
}

export function deleteAppointment(id: string): Promise<void> {
  return api.delete(`${versionV1}${appointmentsPrefix}${appointmentPath(id)}`);
}

export function updateAppointment(id: string, data: ServiceTypes.UpdateAppointmentRequest): Promise<void> {
  return api.put(`${versionV1}${appointmentsPrefix}${appointmentPath(id)}`, data);
}

export function createAppointment(
  data: ServiceTypes.CreateAppointmentRequest,
): Promise<ServiceTypes.CreateAppointmentResponse> {
  return api.post(`${versionV1}${appointmentsPrefix}`, data);
}
