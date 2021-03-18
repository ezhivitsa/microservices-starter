import React, { ReactElement, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Formik, Form } from 'formik';

import { Spinner, Textarea, Button, ButtonSize, ButtonView, ButtonType } from '@packages/ui';
import { FormikField } from '@packages/ui-ex';

import {
  CreateAppointmentStoreProvider,
  useNewCreateAppointmentStore,
  useUsersStore,
  useCreateAppointmentStore,
  useAppointmentsStore,
} from 'providers';

import { FormikCreateAppointmentFieldName, FormikCreateAppointment } from 'stores';

import { calendarTexts } from 'texts';

import { validationSchema } from './validation';
import { getTimes } from './utils';

import { SelectUserField } from './components/select-user-field';
import { DateFields } from './components/date-fields';

interface Props {
  onClose: () => void;
}

export const CreateForm = observer(
  (props: Props): ReactElement => {
    const usersStore = useUsersStore();
    const createAppointmentStore = useCreateAppointmentStore();

    useEffect(() => {
      return () => {
        createAppointmentStore.dispose();
      };
    }, []);

    async function handleSubmit(values: FormikCreateAppointment): Promise<void> {
      await createAppointmentStore.create(values);
      props.onClose();
    }

    function createForm(): ReactElement {
      return (
        <Form>
          <SelectUserField />
          <DateFields />

          <FormikField component={Textarea} name={FormikCreateAppointmentFieldName.Description} />

          <Button
            size={ButtonSize.L}
            type={ButtonType.Submit}
            view={ButtonView.Action}
            disabled={createAppointmentStore.isCreating}
          >
            {calendarTexts.create}
          </Button>

          <Button size={ButtonSize.L} onClick={props.onClose}>
            {calendarTexts.cancel}
          </Button>
        </Form>
      );
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
        onSubmit={handleSubmit}
      >
        {createForm}
      </Formik>
    );
  },
);

export function CreateAppointmentForm(props: Props): ReactElement {
  const usersStore = useUsersStore();
  const appointmentsStore = useAppointmentsStore();

  if (usersStore.isLoading) {
    return <Spinner />;
  }

  return (
    <CreateAppointmentStoreProvider value={useNewCreateAppointmentStore(appointmentsStore, usersStore)}>
      <CreateForm {...props} />
    </CreateAppointmentStoreProvider>
  );
}
