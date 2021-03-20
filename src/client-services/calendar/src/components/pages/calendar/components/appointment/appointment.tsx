import React, { ReactElement } from 'react';
import { observer } from 'mobx-react-lite';
import { format } from 'date-fns';

import { Button, useStyles } from '@packages/ui';

import { AppointmentStore } from 'stores';
import { useAppointmentsStore } from 'providers';

import { calendarTexts } from 'texts';

import styles from './appointment.pcss';

interface Props {
  appointment: AppointmentStore;
}

const DAY_FORMAT = 'dd MM yyyy';
const TIME_FORMAT = 'HH:mm';

export const Appointment = observer(
  ({ appointment }: Props): ReactElement => {
    const b = useStyles(styles, 'appointment');

    const appointmentsStore = useAppointmentsStore();
    const { isDeleting } = appointmentsStore;

    function handleDeleteClick(): void {
      appointmentsStore.delete(appointment.id);
    }

    return (
      <div className={b()}>
        <Button onClick={handleDeleteClick} disabled={isDeleting}>
          {calendarTexts.delete}
        </Button>

        <div>{appointment.userFullName}</div>

        <div className={b('dates')}>
          <span className={b('day')}>{format(appointment.startDate, DAY_FORMAT)}</span>

          <span className={b('date')}>{format(appointment.startDate, TIME_FORMAT)}</span>
          <span className={b('date')}>{format(appointment.endDate, TIME_FORMAT)}</span>
        </div>

        <div>{appointment.description}</div>
      </div>
    );
  },
);
