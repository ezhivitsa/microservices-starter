import { UserTypes } from '@packages/communication';

import { User } from '../types';

export function mapUserDataToClient(data: UserTypes.User): User | null {
  const { id, email, firstName, lastName } = data;

  if (!id || !email || !lastName) {
    return null;
  }

  return {
    id,
    email,
    firstName,
    lastName,
  };
}
