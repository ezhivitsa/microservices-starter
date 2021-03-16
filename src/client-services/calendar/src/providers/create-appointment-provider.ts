import { createContext, useContext, useMemo } from 'react';

import { CreateAppointmentStore, AppointmentsStore, UsersStore } from 'stores';

export const CreateAppointmentStoreContext = createContext(
  new CreateAppointmentStore(new AppointmentsStore(), new UsersStore()),
);
export const CreateAppointmentStoreProvider = CreateAppointmentStoreContext.Provider;

export const useCreateAppointmentStore = (): CreateAppointmentStore => useContext(CreateAppointmentStoreContext);
export const useNewCreateAppointmentStore = (
  appointmentsStore: AppointmentsStore,
  usersStore: UsersStore,
): CreateAppointmentStore =>
  useMemo(() => new CreateAppointmentStore(appointmentsStore, usersStore), [appointmentsStore, usersStore]);
