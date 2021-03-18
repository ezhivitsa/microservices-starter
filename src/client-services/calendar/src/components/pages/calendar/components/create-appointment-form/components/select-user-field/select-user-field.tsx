import React, { ReactElement } from 'react';

import { Select } from '@packages/ui';
import { FormikField } from '@packages/ui-ex';

import { FormikCreateAppointmentFieldName } from 'stores';
import { useUsersStore } from 'providers';

export function SelectUserField(): ReactElement {
  const usersStore = useUsersStore();

  return (
    <FormikField
      component={Select}
      name={FormikCreateAppointmentFieldName.UserId}
      componentProps={{
        items: usersStore.users.map((user) => ({
          text: user.fullName,
          value: user.id,
        })),
      }}
    />
  );
}
