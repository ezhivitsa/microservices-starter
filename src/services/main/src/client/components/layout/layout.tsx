import React, { ReactElement } from 'react';

import { CONTENT_ELEMENT_ID } from 'constants/app.constants';

import styles from './layout.pcss';

interface Props {
  isContentLoading: boolean;
}

export function Layout(props: Props): ReactElement {
  return (
    <div className={styles.layout}>
      <div className={styles.layout__header} />
      <div className={styles.layout__menu} />
      <div id={CONTENT_ELEMENT_ID} className={styles.layout__content} />
    </div>
  );
}
