import React, { ReactElement } from 'react';

import { useStyles } from '../../theme';

import styles from './spinner.pcss';

type SpinnerSize = 's' | 'm' | 'l';

type SpinnerMode = 'default' | 'page';

interface Props {
  size: SpinnerSize;
  mode: SpinnerMode;
}

export function Spinner({ size, mode }: Props): ReactElement {
  const cn = useStyles(styles, 'spinner');

  return (
    <div className={cn({ size, mode })}>
      <div className={styles.spinner__loader}>
        <div className={styles.spinner__loaderElement} />
        <div className={styles.spinner__loaderElement} />
        <div className={styles.spinner__loaderElement} />
        <div className={styles.spinner__loaderElement} />
      </div>
    </div>
  );
}

Spinner.defaultProps = {
  size: 'm',
  mode: 'default',
};
