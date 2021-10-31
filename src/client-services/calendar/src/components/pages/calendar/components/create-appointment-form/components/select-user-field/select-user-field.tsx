import React, { ReactElement } from 'react';
import { observer } from 'mobx-react-lite';

import { Select } from '@packages/ui';
import { FormikField } from '@packages/ui-ex';

import { FormikCreateAppointmentFieldName } from 'stores';
import { useUsersStore } from 'providers';

export const SelectUserField = observer((): ReactElement => {
  const usersStore = useUsersStore();
  const { users } = usersStore;

  return (
    <FormikField
      component={Select}
      name={FormikCreateAppointmentFieldName.UserId}
      componentProps={{
        items: users.map((user) => ({
          text: user.fullName,
          value: user.id,
        })),
      }}
    />
  );
});
