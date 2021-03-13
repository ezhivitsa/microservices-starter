import { UsersService, UsersServiceTypes } from '@root/services';

const defaultUser: UsersServiceTypes.CreateUserParams = {
  id: '1',
  firstName: 'test',
  lastName: 'user',
  email: 'test@test.com',
};

export async function createUser(data: Partial<UsersServiceTypes.CreateUserParams> = {}): Promise<void> {
  await UsersService.createUser({
    ...defaultUser,
    ...data,
  });
}
