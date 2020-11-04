import React, { ReactElement, ReactNode, ChangeEvent, FocusEvent } from 'react';

import { lib } from '@packages/client';

import styles from './input.pcss';

export enum InputSize {}

interface Props {
  value: string;
  name?: string;
  label?: string;
  error?: ReactNode;
  size?: InputSize;
  clear?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  onClearClick?: () => void;
}

const b = lib.block(styles, 'input');

export function Input(props: Props): ReactElement {
  const { name, value, label, error, onChange, onBlur } = props;

  function renderError(): ReactNode {
    if (!error) {
      return null;
    }
  }

  return (
    <div className={b()}>
      <div className={b('inner')}>
        <label>{label}</label>
        <input name={name} value={value} onChange={onChange} onBlur={onBlur} />
        {renderError()}
      </div>
    </div>
  );
}
