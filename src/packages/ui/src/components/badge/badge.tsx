import React, { ReactElement, ReactNode } from 'react';

import { lib } from '@packages/client';

import styles from './badge.pcss';

interface Props {
  children: ReactNode;
}

export function Badge(props: Props): ReactElement<Props> {
  const b = lib.block(styles, 'badge');

  return <div className={b()}>{props.children}</div>;
}
