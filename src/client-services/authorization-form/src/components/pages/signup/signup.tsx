import React, { ReactElement } from 'react';
import { observer } from 'mobx-react-lite';
import { Formik } from 'formik';

import { useStyles } from '@packages/ui';

import styles from './signup.pcss';

export const SignUpPage = observer(
  (): ReactElement => {
    const b = useStyles(styles, 'signup');

    return (
      <div className={b()}>
        <Formik />
      </div>
    );
  },
);
