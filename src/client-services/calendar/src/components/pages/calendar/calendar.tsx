import React, { ReactElement, ReactNode, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

import { Button, ButtonView } from '@packages/ui';

import {
  AppointmentsStoreProvider,
  UsersStoreProvider,
  useNewAppointmentsStore,
  useAppointmentsStore,
  useNewUsersStore,
  useUsersStore,
} from 'providers';
import { AppointmentStore } from 'stores';

import { calendarTexts } from 'texts';

import { CalendarDates } from './components/calendar-dates';
import { CreateAppointmentForm } from './components/create-appointment-form';
import { Appointment } from './components/appointment';

const Calendar = observer(
  (): ReactElement => {
    const appointmentsStore = useAppointmentsStore();
    const usersStore = useUsersStore();

    const [showCreateForm, setShowCreateForm] = useState(false);

    useEffect(() => {
      appointmentsStore.fetch();
      usersStore.fetch();
    }, []);

    function handleCreateClick(): void {
      setShowCreateForm(true);
    }

    function handleCloseForm(): void {
      setShowCreateForm(false);
    }

    function renderAppointment(appointment: AppointmentStore): ReactNode {
      return <Appointment appointment={appointment} />;
    }

    return (
      <div>
        <CalendarDates />

        {showCreateForm ? (
          <CreateAppointmentForm onClose={handleCloseForm} />
        ) : (
          <Button view={ButtonView.Action} onClick={handleCreateClick}>
            {calendarTexts.create}
          </Button>
        )}

        {appointmentsStore.appointments.map(renderAppointment)}
      </div>
    );
  },
);

export function CalendarPage(): ReactElement {
  return (
    <AppointmentsStoreProvider value={useNewAppointmentsStore()}>
      <UsersStoreProvider value={useNewUsersStore()}>
        <Calendar />
      </UsersStoreProvider>
    </AppointmentsStoreProvider>
  );
}
