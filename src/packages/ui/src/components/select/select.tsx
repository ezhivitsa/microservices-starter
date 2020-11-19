import React, { ChangeEvent, ReactElement, ReactNode } from 'react';

interface Item {
  text: string;
  value: string;
}

interface Props {
  value: string;
  items: Item[];
  onChange?: (value: string, event: ChangeEvent) => void;
}

export function Select(props: Props): ReactElement {
  function handleChange(event: ChangeEvent<HTMLSelectElement>): void {
    const { value } = event.target;

    if (value === null) {
      return;
    }

    props.onChange?.(value, event);
  }

  function renderItem(item: Item): ReactNode {
    return (
      <option key={item.value} value={item.value}>
        {item.text}
      </option>
    );
  }

  return (
    <select value={props.value} onChange={handleChange}>
      {props.items.map(renderItem)}
    </select>
  );
}
