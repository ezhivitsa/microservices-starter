import React, { ReactElement, ReactNode } from 'react';

import { lib } from '@packages/client';

import styles from './badge.pcss';

export enum BadgeType {
  Default = 'default',
  Success = 'success',
  Danger = 'danger',
}

interface Props {
  children: ReactNode;
  type?: BadgeType;
}

export function Badge(props: Props): ReactElement<Props> {
  const b = lib.block(styles, 'badge');

  return <div className={b()}>{props.children}</div>;
}
