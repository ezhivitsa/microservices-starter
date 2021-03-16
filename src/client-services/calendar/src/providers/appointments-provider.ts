import { createContext, useContext, useMemo } from 'react';

import { AppointmentsStore } from 'stores';

export const AppointmentsStoreContext = createContext(new AppointmentsStore());
export const AppointmentsStoreProvider = AppointmentsStoreContext.Provider;

export const useAppointmentsStore = (): AppointmentsStore => useContext(AppointmentsStoreContext);
export const useNewAppointmentsStore = (): AppointmentsStore => useMemo(() => new AppointmentsStore(), []);
