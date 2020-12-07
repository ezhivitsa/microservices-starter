import { User } from './types';

export async function createUser(params: CreateParams): Promise<User> {
  return {
    id: '1',
    firstName: '',
    lastName: '',
  };
}
