import React, { ReactElement } from 'react';
import { observer } from 'mobx-react-lite';
import { Formik, Form } from 'formik';

import { Spinner } from '@packages/ui';

import {
  CreateAppointmentStoreProvider,
  useNewCreateAppointmentStore,
  useUsersStore,
  useAppointmentsStore,
} from 'providers';

import { validationSchema } from './validation';
import { getTimes } from './utils';

export const CreateForm = observer(
  (): ReactElement => {
    const usersStore = useUsersStore();

    function createForm(): ReactElement {
      return <Form></Form>;
    }

    const times = getTimes({ start: true });
    return (
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          userId: usersStore.users[0].id,
          start: times[0],
          end: times[1],
          description: '',
        }}
      >
        {createForm}
      </Formik>
    );
  },
);

export function CreateAppointmentForm(): ReactElement {
  const usersStore = useUsersStore();
  const appointmentsStore = useAppointmentsStore();

  if (usersStore.isLoading) {
    return <Spinner />;
  }

  return (
    <CreateAppointmentStoreProvider
      value={useNewCreateAppointmentStore(appointmentsStore, usersStore)}
    ></CreateAppointmentStoreProvider>
  );
}
