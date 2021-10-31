import React, { ReactElement, ReactNode, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { FormikField, Formik, FormikHelpers, FormikProps, Form } from '@packages/ui-ex';
import { Input, InputWidth, Button, ButtonView, ButtonType, Spinner, useStyles } from '@packages/ui';
import { FrontEvents } from '@packages/common';

import { CurrentUserStore, FormikCurrentUser, FormikCurrentUserFieldName } from 'stores';
import { useCurrentUserStore, CurrentUserStoreProvider } from 'providers';

import { profileFormTexts } from 'texts';

import { validationSchema } from './validation';

import styles from './profile.pcss';

export const Profile = observer((): ReactElement => {
  const b = useStyles(styles, 'profile');
  const currentUserStore = useCurrentUserStore();
  const { isUpdating } = currentUserStore;

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

    if (currentUserStore.isUpdateDone) {
      const event = new Event(FrontEvents.updateCurrentUser);
      window.dispatchEvent(event);
    }
  }

  function renderForm({ isValid, handleSubmit }: FormikProps<FormikCurrentUser>): ReactNode {
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

        <Button
          view={ButtonView.Action}
          type={ButtonType.Submit}
          onClick={handleSubmit}
          disabled={!isValid || isUpdating}
        >
          {profileFormTexts.updateBtn}
        </Button>
      </Form>
    );
  }

  if (currentUserStore.isLoading) {
    return <Spinner />;
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
});

export function ProfilePage(): ReactElement {
  return (
    <CurrentUserStoreProvider value={new CurrentUserStore()}>
      <Profile />
    </CurrentUserStoreProvider>
  );
}
