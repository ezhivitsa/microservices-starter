import { UserTypes } from '@packages/communication';

import { UsersServiceTypes } from '@root/services';

export function mapUserCreatedToClient(data: UserTypes.UserCreatedData): UsersServiceTypes.CreateUserParams | null {
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
