import React, { ReactElement } from 'react';
import ReactDOM from 'react-dom';

import { Spinner } from '@packages/ui/spinner';

import { CONTENT_ELEMENT_ID } from 'constants/app.constants';

import styles from './layout.pcss';

interface Props {
  isContentLoading: boolean;
}

export function Layout({ isContentLoading }: Props): ReactElement {
  return (
    <div className={styles.layout}>
      <div className={styles.layout__header} />
      <div className={styles.layout__menu} />
      <div className={styles.layout__content}>
        <div id={CONTENT_ELEMENT_ID} />

        {/* {isContentLoading && <Spinner />} */}
        {isContentLoading && <div>Loading1</div>}
      </div>
    </div>
  );
}

export function renderLayout({ isContentLoading }: Props): void {
  const container = document.getElementById('root');
  console.log(container);
  ReactDOM.render(<Layout isContentLoading={isContentLoading} />, container);
}
