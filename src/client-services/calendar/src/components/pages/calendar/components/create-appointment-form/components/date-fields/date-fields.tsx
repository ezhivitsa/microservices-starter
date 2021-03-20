import React, { ReactElement } from 'react';
import { useField } from 'formik';
import { set } from 'date-fns';

import { FormikField } from '@packages/ui-ex';

import { FormikCreateAppointmentFieldName } from 'stores';

import { DateInput } from 'components/common/date-input';
import { TimeSelect } from 'components/common/time-select';

import { getTimes } from '../../utils';

import { calendarTexts } from 'texts';

export function DateFields(): ReactElement {
  const [startDate, , startDateHelpers] = useField<Date>(FormikCreateAppointmentFieldName.Start);
  const [endDate, , endDateHelpers] = useField<Date>(FormikCreateAppointmentFieldName.End);

  function handleDateChange(value: Date): void {
    const day = {
      year: value.getFullYear(),
      month: value.getMonth(),
      date: value.getDate(),
    };
    const newStartDate = set(startDate.value, day);
    const newEndDate = set(endDate.value, day);

    startDateHelpers.setValue(newStartDate);
    endDateHelpers.setValue(newEndDate);
  }

  return (
    <div>
      <DateInput value={startDate.value} onChange={handleDateChange} />

      <FormikField
        name={FormikCreateAppointmentFieldName.Start}
        component={TimeSelect}
        componentProps={{
          label: calendarTexts.start,
          items: getTimes({ start: true }),
        }}
      />

      <FormikField
        name={FormikCreateAppointmentFieldName.End}
        component={TimeSelect}
        componentProps={{
          label: calendarTexts.end,
          items: getTimes({ end: true }),
        }}
      />
    </div>
  );
}
