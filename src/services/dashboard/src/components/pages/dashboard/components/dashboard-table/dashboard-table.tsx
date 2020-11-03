import React, { ReactElement, ReactNode } from 'react';
import classnames from 'classnames';

import { lib } from '@packages/client';

import styles from './dashboard-table.pcss';

export enum TableColor {
  Purple = 'purple',
  Green = 'green',
  Blue = 'blue',
  Orange = 'orange',
}

interface Props {
  columns: string[];
  rows: string[][];
  headerTitle: string;
  headerDescription?: string;
  className?: string;
  color?: TableColor;
  keyIndex: number;
}

const b = lib.block(styles, 'dashboardTable');

export function DashboardTable({
  className,
  color,
  headerTitle,
  headerDescription,
  columns,
  rows,
  keyIndex,
}: Props): ReactElement {
  return (
    <div className={classnames(b(), className)}>
      <div className={b('header', { color })}>
        <span className={b('title')}>{headerTitle}</span>
        <span className={b('headerDescription')}>{headerDescription}</span>
      </div>

      <div
        className={b('table')}
        style={{
          gridTemplateColumns: `repeat(${columns.length}, auto)`,
        }}
      >
        {columns.map(
          (column: string): ReactNode => (
            <div key={column} className={b('tableColumn', { header: true, color })}>
              {column}
            </div>
          ),
        )}

        {rows.map(
          (row: string[]): ReactNode => {
            return row.map(
              (value: string, index: number): ReactNode => (
                <div key={`${row[keyIndex]}_${columns[index]}`} className={b('tableColumn')}>
                  {value}
                </div>
              ),
            );
          },
        )}
      </div>
    </div>
  );
}
