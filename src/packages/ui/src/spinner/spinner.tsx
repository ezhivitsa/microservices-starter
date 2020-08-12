import React, { ReactElement } from 'react';
import classnames from 'classnames';

import styles from './spinner.pcss';

type SpinnerSize = 's' | 'm' | 'l';

type SpinnerMode = 'default' | 'page';

interface Props {
  size: SpinnerSize;
  mode: SpinnerMode;
}

export function Spinner({ size, mode }: Props): ReactElement {
  return (
    <div className={classnames(styles.spinner, styles[`_size_${size}`], styles[`_mode_${mode}`])}>
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
