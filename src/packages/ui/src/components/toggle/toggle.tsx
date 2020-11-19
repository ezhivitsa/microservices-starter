import React, { ReactElement, ChangeEvent } from 'react';

import { useStyles } from '../../theme';

import styles from './toggle.pcss';

export enum ToggleSize {
  S = 's',
  M = 'm',
  L = 'l',
  XL = 'xl',
}

interface Props {
  checked: boolean;
  label?: string;
  size: ToggleSize;
  onChange?: (checked: boolean) => void;
}

export function Toggle({ checked, label, size, onChange }: Props): ReactElement {
  const b = useStyles(styles, 'toggle');

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    onChange?.(event.target.checked);
  }

  return (
    <div className={b()}>
      <label className={b('checkbox-wrap', { size })}>
        <input type="checkbox" className={b('checkbox', { size })} onChange={handleChange} checked={checked} />
        <span className={b('slider', { checked, size })} />
      </label>

      {label && <span className={b('label', { size })}>{label}</span>}
    </div>
  );
}

Toggle.defaultProps = {
  size: ToggleSize.M,
};
