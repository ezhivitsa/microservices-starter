import React, { ReactElement, ChangeEvent, FocusEvent, ReactNode } from 'react';

interface Props {
  value?: string;
  label?: ReactNode;
  className?: string;
  error?: ReactNode;

  onChange?: (value?: string, event?: ChangeEvent) => void;
  onFocus?: (event?: FocusEvent) => void;
  onBlur?: (event?: FocusEvent) => void;
}

export function Textarea(props: Props): ReactElement {
  function handleChange(e: ChangeEvent<HTMLTextAreaElement>): void {
    const value = e.target.value;
    props.onChange?.(value, e);
  }

  return (
    <div>
      <label>{props.label}</label>
      <textarea value={props.value} onChange={handleChange} onFocus={props.onFocus} onBlur={props.onBlur} />
    </div>
  );
}
