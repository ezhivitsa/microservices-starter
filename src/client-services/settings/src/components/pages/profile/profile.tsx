import React, { ReactElement, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Formik, Form } from 'formik';

import { CurrentUserStore } from 'stores';
import { useCurrentUserStore, CurrentUserStoreProvider } from 'providers';

export const Profile = observer(
  (): ReactElement => {
    const currentUserStore = useCurrentUserStore();

    useEffect(() => {
      currentUserStore.fetch();

      return () => {
        currentUserStore.dispose();
      };
    }, []);

    return <Formik />;
  },
);

export function ProfilePage(): ReactElement {
  return (
    <CurrentUserStoreProvider value={new CurrentUserStore()}>
      <Profile />
    </CurrentUserStoreProvider>
  );
}
