import React, { ReactElement, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Formik, FormikHelpers, Form } from 'formik';

import { CurrentUserStore, FormikCurrentUser } from 'stores';
import { useCurrentUserStore, CurrentUserStoreProvider } from 'providers';

import { validationSchema } from './validation';

export const Profile = observer(
  (): ReactElement => {
    const currentUserStore = useCurrentUserStore();

    useEffect(() => {
      currentUserStore.fetch();

      return () => {
        currentUserStore.dispose();
      };
    }, []);

    async function handleUpdateProfile(
      values: FormikCurrentUser,
      { setErrors }: FormikHelpers<FormikCurrentUser>,
    ): Promise<void> {
      await currentUserStore.update(values);
      setErrors(currentUserStore.formikErrors);
    }

    return (
      <Formik
        initialValues={currentUserStore.formikValues}
        validationSchema={validationSchema}
        onSubmit={handleUpdateProfile}
      />
    );
  },
);

export function ProfilePage(): ReactElement {
  return (
    <CurrentUserStoreProvider value={new CurrentUserStore()}>
      <Profile />
    </CurrentUserStoreProvider>
  );
}
