import React, { ReactElement, ReactNode, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Formik, FormikHelpers, Form } from 'formik';

import { FormikField } from '@packages/ui-ex';
import { Input, InputWidth, useStyles } from '@packages/ui';

import { CurrentUserStore, FormikCurrentUser, FormikCurrentUserFieldName } from 'stores';
import { useCurrentUserStore, CurrentUserStoreProvider } from 'providers';

import { profileFormTexts } from 'texts';

import { validationSchema } from './validation';

import styles from './profile.pcss';

export const Profile = observer(
  (): ReactElement => {
    const b = useStyles(styles, 'profile');
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

    function renderForm(): ReactNode {
      return (
        <Form>
          <FormikField
            name={FormikCurrentUserFieldName.FirstName}
            component={Input}
            componentProps={{
              label: profileFormTexts.firstName,
              placeholder: profileFormTexts.firstNamePlaceholder,
              width: InputWidth.Available,
              className: b('input'),
            }}
          />
          <FormikField
            name={FormikCurrentUserFieldName.LastName}
            component={Input}
            componentProps={{
              label: profileFormTexts.lastName,
              placeholder: profileFormTexts.lastNamePlaceholder,
              width: InputWidth.Available,
              className: b('input'),
            }}
          />
        </Form>
      );
    }

    if (currentUserStore.isLoading) {
      return <div>Loading</div>;
    }

    return (
      <Formik
        initialValues={currentUserStore.formikValues}
        validationSchema={validationSchema}
        onSubmit={handleUpdateProfile}
      >
        {renderForm}
      </Formik>
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
