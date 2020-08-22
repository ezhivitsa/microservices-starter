import React, { ReactElement } from 'react';
import classnames from 'classnames';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

import styles from './dashboard-card.pcss';

export enum ColorType {
  Purple = 'purple',
  Green = 'green',
  Blue = 'blue',
  Orange = 'orange',
}

interface Props {
  icon: IconDefinition;
  className?: string;
  value: string | number;
  title: string;
  footerIcon: IconDefinition;
  footerContent: string;
  iconColor: ColorType;
}

export function DashboardCard({
  className,
  icon,
  iconColor,
  title,
  value,
  footerIcon,
  footerContent,
}: Props): ReactElement {
  return (
    <div className={classnames(styles.dashboardCard, className)}>
      <div className={styles.dashboardCard__header}>
        <div className={classnames(styles.dashboardCard__icon, styles[`_color_${iconColor}`])}>
          <FontAwesomeIcon icon={icon} />
        </div>

        <div className={styles.dashboardCard__data}>
          <span className={styles.dashboardCard__title}>{title}</span>

          <span className={styles.dashboardCard_value}>{value}</span>
        </div>
      </div>

      <div className={styles.cardFooter}>
        <FontAwesomeIcon icon={footerIcon} className={styles.dashboardCard__footerIcon} />
        <span>{footerContent}</span>
      </div>
    </div>
  );
}
