import { User } from './types';

export async function createUser(): Promise<User> {
  return {
    id: '1',
    firstName: '',
    lastName: '',
  };
}
