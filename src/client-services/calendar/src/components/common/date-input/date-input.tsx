import React, { ReactElement, ChangeEvent } from 'react';
import { format, parse, isValid } from 'date-fns';

import { INPUT_DATE_FORMAT } from 'constants/app.constants';

interface Props {
  value: Date;
  onChange: (value: Date) => void;
  className?: string;
}

export function DateInput(props: Props): ReactElement {
  function handleDateChange(event: ChangeEvent<HTMLInputElement>): void {
    const date = parse(event.target.value, INPUT_DATE_FORMAT, new Date());
    if (isValid(date)) {
      props.onChange(date);
    }
  }

  return (
    <input
      type="date"
      className={props.className}
      value={format(props.value, INPUT_DATE_FORMAT)}
      onChange={handleDateChange}
    />
  );
}
