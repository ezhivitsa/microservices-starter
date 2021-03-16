import React, { ReactElement, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { AppointmentsStoreProvider, useNewAppointmentsStore, useAppointmentsStore } from 'providers';

import { CalendarDates } from './components/calendar-dates';

const Calendar = observer(
  (): ReactElement => {
    const appointmentsStore = useAppointmentsStore();

    useEffect(() => {
      appointmentsStore.fetch();
    }, []);

    return (
      <div>
        <CalendarDates />
      </div>
    );
  },
);

export function CalendarPage(): ReactElement {
  return (
    <AppointmentsStoreProvider value={useNewAppointmentsStore()}>
      <Calendar />
    </AppointmentsStoreProvider>
  );
}
