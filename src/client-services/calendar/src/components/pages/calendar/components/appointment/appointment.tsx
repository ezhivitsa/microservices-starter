import React, { ReactElement } from 'react';
import { observer } from 'mobx-react-lite';

import { Button, useStyles } from '@packages/ui';

import { AppointmentStore } from 'stores';
import { useAppointmentsStore } from 'providers';

import { calendarTexts } from 'texts';

import styles from './appointment.pcss';

interface Props {
  appointment: AppointmentStore;
}

export const Appointment = observer(
  ({ appointment }: Props): ReactElement => {
    const appointmentsStore = useAppointmentsStore();
    const b = useStyles(styles, 'appointments');

    function handleDeleteClick(): void {
      appointmentsStore.delete(appointment.id);
    }

    return (
      <div>
        <Button onClick={handleDeleteClick} disabled={appointmentsStore.isDeleting}>
          {calendarTexts.delete}
        </Button>

        <div>{appointment.userFullName}</div>

        <div className={b('dates')}>
          <span>{appointment.startDate}</span>
          <span>{appointment.endDate}</span>
        </div>
      </div>
    );
  },
);
