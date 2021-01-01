import { UserTypes } from '@packages/communication';

export interface RegistrationRequest extends Required<Omit<UserTypes.RegistrationRequest, 'firstName'>> {
  firstName?: string;
}

export interface User extends Required<Omit<UserTypes.User, 'firstName'>> {
  firstName?: string;
}

export type GetCurrentUserRequest = Required<UserTypes.GetCurrentUserRequest>;
