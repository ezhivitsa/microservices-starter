import { UserTypes } from '@packages/communication';

export interface RegistrationRequest extends Required<Omit<UserTypes.RegistrationRequest, 'firstName'>> {
  firstName?: string;
}

export interface User extends Required<Omit<UserTypes.User, 'firstName'>> {
  firstName?: string;
}

export type GetUserByAuthIdRequest = Required<UserTypes.GetUserByAuthIdRequest>;

export interface UpdateUserRequest extends Required<Omit<UserTypes.UpdateUserRequest, 'firstName'>> {
  firstName?: string;
}
