import React, { ReactElement, useEffect, useState } from 'react';
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

import { calendarTexts } from 'texts';

import { CalendarDates } from './components/calendar-dates';

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

    return (
      <div>
        <CalendarDates />

        <Button view={ButtonView.Action} onClick={handleCreateClick}>
          {calendarTexts.create}
        </Button>

        {showCreateForm}
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
