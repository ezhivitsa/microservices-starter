import React, { ReactElement, ChangeEvent } from 'react';
import { format, formatISO, isValid } from 'date-fns';

interface Props {
  label?: string;
  value?: Date;
  items: Date[];
  onChange?: (value: Date) => void;
}

const TIME_FORMAT = 'hh:mm';

export function TimeSelect(props: Props): ReactElement {
  const value = props.value || new Date();

  function handleChange(e: ChangeEvent<HTMLSelectElement>): void {
    const updatedValue = e.target.value;
    const date = formatISO(value, { representation: 'date' });

    const changeDate = new Date(`${date}T${updatedValue}`);
    if (isValid(changeDate)) {
      props.onChange?.(changeDate);
    }
  }

  function renderOption(item: Date): ReactElement {
    const time = format(item, TIME_FORMAT);
    const itemValue = formatISO(item, { representation: 'time' });

    return (
      <option key={itemValue} value={itemValue}>
        {time}
      </option>
    );
  }

  const formattedValue = formatISO(value, { representation: 'time' });
  return (
    <div>
      <label>{props.label}</label>
      <select value={formattedValue} onChange={handleChange}>
        {props.items.map(renderOption)}
      </select>
    </div>
  );
}
