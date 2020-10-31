import React, { ReactElement, ReactNode } from 'react';

import styles from './badge.pcss';

interface Props {
  children: ReactNode;
}

export function Badge(props: Props): ReactElement<Props> {
  return <div className={styles.badge}>{props.children}</div>;
}
