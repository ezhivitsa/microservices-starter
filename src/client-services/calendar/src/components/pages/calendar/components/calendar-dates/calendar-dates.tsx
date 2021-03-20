import React, { ReactElement } from 'react';
import { observer } from 'mobx-react-lite';

import { useAppointmentsStore } from 'providers';

import { DateInput } from 'components/common/date-input';

export const CalendarDates = observer(
  (): ReactElement => {
    const appointmentsStore = useAppointmentsStore();
    const { from, to } = appointmentsStore;

    function handleFromChange(value: Date): void {
      appointmentsStore.setFrom(value);
    }

    function handleToChange(value: Date): void {
      appointmentsStore.setTo(value);
    }

    return (
      <div>
        <DateInput value={from} onChange={handleFromChange} />
        <DateInput value={to} onChange={handleToChange} />
      </div>
    );
  },
);
