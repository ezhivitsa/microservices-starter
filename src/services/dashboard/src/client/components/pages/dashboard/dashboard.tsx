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

import { ColorType, DashboardCard } from './components/dashboard-card';

import styles from './dashboard.pcss';

interface CardType {
  icon: IconDefinition;
  value: number | string;
  title: string;
  footerIcon: IconDefinition;
  footerContent: string;
  iconColor: ColorType;
}

const cards: Array<CardType> = [
  {
    icon: faUserFriends,
    value: 300,
    title: 'Users',
    footerIcon: faCheck,
    footerContent: 'Online more than 50%',
    iconColor: ColorType.Green,
  },
  {
    icon: faCommentDots,
    value: 1201,
    title: 'Messages',
    footerIcon: faChartLine,
    footerContent: '50 posts per hour',
    iconColor: ColorType.Purple,
  },
  {
    icon: faFileDownload,
    value: 7652,
    title: 'Downloads',
    footerIcon: faDatabase,
    footerContent: '42gb downloaded',
    iconColor: ColorType.Orange,
  },
  {
    icon: faExclamationCircle,
    value: 'live',
    title: 'API status',
    footerIcon: faSun,
    footerContent: 'No problems found',
    iconColor: ColorType.Blue,
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

  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboard__cards}>{renderCards()}</div>
      {/* <div className={styles.tables}>
        {tables.map(
          (table: TableType): React$Node => {
            return (
              <Table
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
        )}
      </div> */}
    </div>
  );
}
