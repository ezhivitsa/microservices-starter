import React, { ReactElement, ChangeEvent } from 'react';
import { format, formatISO, isValid } from 'date-fns';

interface Props {
  label?: string;
  value: Date;
  items: Date[];
  onChange?: (value: Date) => void;
}

const TIME_FORMAT = 'hh:mm';

export function TimeSelect(props: Props): ReactElement {
  function handleChange(e: ChangeEvent<HTMLSelectElement>): void {
    const updatedValue = e.target.value;
    const date = formatISO(props.value, { representation: 'date' });

    const changeDate = new Date(`${date}T${updatedValue}`);
    if (isValid(changeDate)) {
      props.onChange?.(changeDate);
    }
  }

  function renderOption(item: Date): ReactElement {
    const time = format(item, TIME_FORMAT);
    const itemValue = formatISO(item, { representation: 'time' });

    return <option value={itemValue}>{time}</option>;
  }

  const value = formatISO(props.value, { representation: 'time' });
  return (
    <div>
      <label>{props.label}</label>
      <select value={value} onChange={handleChange}>
        {props.items.map(renderOption)}
      </select>
    </div>
  );
}
