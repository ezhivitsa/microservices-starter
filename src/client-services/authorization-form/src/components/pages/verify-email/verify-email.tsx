import React, { ReactElement, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useParams, useHistory } from 'react-router-dom';

import { Spinner } from '@packages/ui';

import { useVerifyEmailStore } from 'providers';

import { VerifyEmailParams } from 'components/pages/path-templates';
import { signinPath } from 'components/pages/paths';

export const VerifyEmailPage = observer((): ReactElement | null => {
  const verifyEmailStore = useVerifyEmailStore();
  const { token } = useParams<VerifyEmailParams>();
  const history = useHistory();

  const { isLoading } = verifyEmailStore;

  useEffect(() => {
    verifyEmail();
  }, []);

  async function verifyEmail(): Promise<void> {
    await verifyEmailStore.verify(token);
    if (verifyEmailStore.isVerifyDone) {
      history.push(signinPath);
    }
  }

  if (isLoading) {
    return <Spinner />;
  }

  return null;
});
