import React, { ReactElement, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';

import { useStyles } from '@packages/ui';

import { config } from 'lib/config';

import { formatComponentPath } from 'components/pages/paths';

import styles from './desktop-navigation.pcss';

interface Props {
  className?: string;
}

export function DesktopNavigation({ className }: Props): ReactElement {
  const b = useStyles(styles, 'desktop-navigation');

  function renderComponentItem(item: string): ReactNode {
    return (
      <div key={item} className={b('item-wrap')}>
        <NavLink className={b('item')} activeClassName={styles._active} to={formatComponentPath(item)}>
          {item}
        </NavLink>
      </div>
    );
  }

  return <div className={classnames(b(), className)}>{config.components.map(renderComponentItem)}</div>;
}
