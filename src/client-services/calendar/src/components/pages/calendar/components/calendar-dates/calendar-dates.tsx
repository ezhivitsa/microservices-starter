import React, { ReactElement, ChangeEvent } from 'react';
import { observer } from 'mobx-react-lite';
import { format, parse, isValid } from 'date-fns';

import { useAppointmentsStore } from 'providers';

import { INPUT_DATE_FORMAT } from 'constants/app.constants';

export const CalendarDates = observer(
  (): ReactElement => {
    const appointmentsStore = useAppointmentsStore();

    function handleFromChange(event: ChangeEvent<HTMLInputElement>): void {
      const date = parse(event.target.value, INPUT_DATE_FORMAT, new Date());
      if (isValid(date)) {
        appointmentsStore.setFrom(date);
      }
    }

    return (
      <div>
        <input
          type="date"
          name="from"
          value={format(appointmentsStore.from, INPUT_DATE_FORMAT)}
          onChange={handleFromChange}
        />
      </div>
    );
  },
);
