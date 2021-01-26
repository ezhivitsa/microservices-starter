import React, { ReactElement, ReactNode } from 'react';
import classnames from 'classnames';

import { useStyles } from '@packages/ui';

import styles from './form.pcss';

interface Props {
  children?: ReactNode;
  className?: string;
}

export function Form({ children, className }: Props): ReactElement {
  const b = useStyles(styles, 'form');

  return <div className={classnames(b(), className)}>{children}</div>;
}
