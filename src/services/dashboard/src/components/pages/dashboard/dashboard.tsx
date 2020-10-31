import React, { ReactElement, ReactNode } from 'react';

import {
  faUserFriends,
  faCheck,
  faCommentDots,
  faChartLine,
  faFileDownload,
  faDatabase,
  faExclamationCircle,
  faSun,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

import { Badge } from '@packages/ui';

import { CardColor, DashboardCard } from './components/dashboard-card';
import { TableColor, DashboardTable } from './components/dashboard-table';

import styles from './dashboard.pcss';

interface CardType {
  icon: IconDefinition;
  value: number | string;
  title: string;
  footerIcon: IconDefinition;
  footerContent: string;
  iconColor: CardColor;
}

interface TableType {
  columns: string[];
  rows: string[][];
  headerTitle: string;
  headerDescription?: string;
  className: string;
  color: TableColor;
  keyIndex: number;
}

const cards: Array<CardType> = [
  {
    icon: faUserFriends,
    value: 300,
    title: 'Users',
    footerIcon: faCheck,
    footerContent: 'Online more than 50%',
    iconColor: CardColor.Green,
  },
  {
    icon: faCommentDots,
    value: 1201,
    title: 'Messages',
    footerIcon: faChartLine,
    footerContent: '50 posts per hour',
    iconColor: CardColor.Purple,
  },
  {
    icon: faFileDownload,
    value: 7652,
    title: 'Downloads',
    footerIcon: faDatabase,
    footerContent: '42gb downloaded',
    iconColor: CardColor.Orange,
  },
  {
    icon: faExclamationCircle,
    value: 'live',
    title: 'API status',
    footerIcon: faSun,
    footerContent: 'No problems found',
    iconColor: CardColor.Blue,
  },
];

const tables: Array<TableType> = [
  {
    headerTitle: 'Employees Stats',
    headerDescription: 'New employees on 15th November, 2018',
    color: TableColor.Orange,
    columns: ['Id', 'Name', 'Salary', 'Country'],
    rows: [
      ['1', 'Dakota Rice', '$36,738', 'Niger'],
      ['2', 'Minerva Hooper', '$23,789', 'Curaçao'],
      ['3', 'Sage Rodriguez', '$56,142', 'Netherlands'],
      ['4', 'Philip Chaney', '$38,735', 'Korea, South'],
    ],
    keyIndex: 0,
    className: styles.dashboardTable,
  },
  {
    headerTitle: 'Global Sales by Top Locations',
    headerDescription: 'All Products That Were Shipped',
    color: TableColor.Green,
    columns: ['Country', 'Money turnover', 'Market share'],
    rows: [
      ['USA', '2.920', '53.23%'],
      ['Germany', '1.300', '20.43%'],
      ['Australia', '760', '10.35%'],
      ['United Kingdom', '690', '7.87%'],
    ],
    keyIndex: 0,
    className: styles.dashboardTable,
  },
];

export function DashboardPage(): ReactElement {
  function renderCards(): ReactNode[] {
    return cards.map(
      (card: CardType): ReactNode => {
        return (
          <DashboardCard
            key={card.title}
            icon={card.icon}
            value={card.value}
            title={card.title}
            footerIcon={card.footerIcon}
            footerContent={card.footerContent}
            className={styles.dashboardCard}
            iconColor={card.iconColor}
          />
        );
      },
    );
  }

  function renderTable(): ReactNode[] {
    return tables.map(
      (table: TableType): ReactNode => {
        return (
          <DashboardTable
            key={table.headerTitle}
            headerTitle={table.headerTitle}
            headerDescription={table.headerDescription}
            color={table.color}
            columns={table.columns}
            rows={table.rows}
            keyIndex={0}
            className={styles.dashboardTable}
          />
        );
      },
    );
  }

  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboard__cards}>{renderCards()}</div>
      <div className={styles.dashboard__tables}>{renderTable()}</div>
    </div>
  );
}
