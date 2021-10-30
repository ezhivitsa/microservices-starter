import React, { ReactElement, ReactNode } from 'react';

import { useStyles } from '../../theme';

import styles from './paragraph.pcss';

export enum ParagraphSize {
  S = 's',
  M = 'm',
  L = 'l',
  XL = 'xl',
}

interface Props {
  size: ParagraphSize;
  className?: string;
  muted?: boolean;
  children?: ReactNode;
}

export function Paragraph({ size, className, muted, children }: Props): ReactElement {
  const b = useStyles(styles, 'paragraph', className);

  return <div className={b({ size, muted })}>{children}</div>;
}

Paragraph.defaultProps = {
  size: ParagraphSize.M,
};
