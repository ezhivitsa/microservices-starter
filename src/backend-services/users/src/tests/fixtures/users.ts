import { CommandUserRole } from '@packages/communication';
import { SessionUser } from '@packages/koa-kafka';

import { UsersService, UsersTypes } from '@root/services';

export const testUser: UsersTypes.RegisterParams = {
  authId: '1',
  email: 'test@test.com',
  firstName: 'Test',
  lastName: 'User',
};

const user = new SessionUser({
  id: '1',
  roles: [CommandUserRole.User, CommandUserRole.Admin, CommandUserRole.OrganizationAdmin],
});

export async function registerUser(userData: Partial<UsersTypes.RegisterParams> = {}): Promise<UsersTypes.User | null> {
  const registerData: UsersTypes.RegisterParams = {
    ...testUser,
    ...userData,
  };

  await UsersService.register(registerData, { user });

  return UsersService.getUserByAuthId({ authId: registerData.authId });
}

export function getUserByAuthId(authId: string): Promise<UsersTypes.User | null> {
  return UsersService.getUserByAuthId({ authId });
}
