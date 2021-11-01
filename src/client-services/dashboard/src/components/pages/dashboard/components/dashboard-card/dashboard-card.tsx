import React, { ReactElement } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

import { useStyles } from '@packages/ui';

import styles from './dashboard-card.pcss';

export enum CardColor {
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
  iconColor: CardColor;
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
  const b = useStyles(styles, 'dashboardCard', className);

  return (
    <div className={b({ color: iconColor })}>
      <div className={b('header')}>
        <div className={b('icon', { color: iconColor })}>
          <FontAwesomeIcon icon={icon} />
        </div>

        <div className={b('data')}>
          <span className={b('title')}>{title}</span>

          <span className={b('value')}>{value}</span>
        </div>
      </div>

      <div className={b('footer')}>
        <FontAwesomeIcon icon={footerIcon} className={b('footerIcon')} />
        <span>{footerContent}</span>
      </div>
    </div>
  );
}
