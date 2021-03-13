import { UserTypes } from '@packages/communication';

import { UsersServiceTypes } from '@root/services';

export function mapUserUpdatedToClient(data: UserTypes.UserUpdatedData): UsersServiceTypes.UpdateUserParams | null {
  const { id, firstName, lastName, email } = data;
  if (!id || !lastName || !email) {
    return null;
  }

  return {
    id,
    firstName,
    lastName,
    email,
  };
}
