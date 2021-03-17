import React, { ReactElement } from 'react';
import { observer } from 'mobx-react-lite';

import { useAppointmentsStore } from 'providers';

import { DateInput } from 'components/common/date-input';

export const CalendarDates = observer(
  (): ReactElement => {
    const appointmentsStore = useAppointmentsStore();

    function handleFromChange(value: Date): void {
      appointmentsStore.setFrom(value);
    }

    function handleToChange(value: Date): void {
      appointmentsStore.setTo(value);
    }

    return (
      <div>
        <DateInput value={appointmentsStore.from} onChange={handleFromChange} />
        <DateInput value={appointmentsStore.to} onChange={handleToChange} />
      </div>
    );
  },
);
