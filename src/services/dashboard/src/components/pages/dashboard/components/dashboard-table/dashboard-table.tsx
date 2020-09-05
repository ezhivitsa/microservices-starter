import React, { ReactElement, ReactNode } from 'react';
import classnames from 'classnames';

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
    <div className={classnames(styles.dashboardTable, className)}>
      <div className={classnames(styles.dashboardTable__header, styles[`_color_${color}`])}>
        <span className={styles.dashboardTable__title}>{headerTitle}</span>
        <span className={styles.dashboardTable__headerDescription}>{headerDescription}</span>
      </div>

      <div
        className={styles.dashboardTable__table}
        style={{
          gridTemplateColumns: `repeat(${columns.length}, auto)`,
        }}
      >
        {columns.map(
          (column: string): ReactNode => (
            <div
              key={column}
              className={classnames(styles.dashboardTable__tableColumn, styles._header, styles[`_color_${color}`])}
            >
              {column}
            </div>
          ),
        )}

        {rows.map(
          (row: string[]): ReactNode => {
            return row.map(
              (value: string, index: number): ReactNode => (
                <div key={`${row[keyIndex]}_${columns[index]}`} className={styles.dashboardTable__tableColumn}>
                  {value}
                </div>
              ),
            );
          },
        )}
      </div>

      {/* <table
        className={classnames(styles.dashboardTable__table, styles[`_color_${color}`])}
        cellPadding="0"
        cellSpacing="0"
      >
        <thead>
          <tr>
            {columns.map(
              (column: string): ReactNode => (
                <td key={column}>{column}</td>
              ),
            )}
          </tr>
        </thead>
        <tbody>
          {rows.map(
            (row: Array<string>): ReactNode => {
              return (
                <tr key={row[keyIndex]}>
                  {row.map(
                    (value: string, index: number): ReactNode => (
                      <td key={`${row[keyIndex]}_${columns[index]}`}>{value}</td>
                    ),
                  )}
                </tr>
              );
            },
          )}
        </tbody>
      </table> */}
    </div>
  );
}
