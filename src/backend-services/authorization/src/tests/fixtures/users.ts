import { AuthService, AuthTypes } from '@root/services';

export const testUser: AuthTypes.RegisterParams = {
  email: 'test@test.com',
  password: 'qwerty',
  owner: true,
};

export function registerUser(userData: Partial<AuthTypes.RegisterParams> = {}): Promise<AuthTypes.User> {
  return AuthService.register({
    ...testUser,
    ...userData,
  });
}

export function getUserById(id: string): Promise<AuthTypes.User | null> {
  return AuthService.getUserById({ id });
}
