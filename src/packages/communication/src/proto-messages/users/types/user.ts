import { CommonTypes } from '../../common';

// Registration
export interface RegistrationRequest {
  authId?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
}

// GetCurrentUser
export interface GetUserByAuthIdRequest {
  authId?: string;
}

export interface User {
  id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
}

export interface GetUserByAuthIdResponse {
  user?: User;
}

// UpdateUser
export interface UpdateUserRequest {
  id?: string;
  firstName?: string;
  lastName?: string;
}

export interface UpdateUserResponse {
  user?: User;
}

// Events
export interface UserCreatedData {
  id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
}

export interface UserCreatedEvent {
  data?: UserCreatedData;
  metadata?: CommonTypes.EventMeta;
}

export interface UserUpdatedData {
  id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
}

export interface UserUpdatedEvent {
  data?: UserCreatedData;
  metadata?: CommonTypes.EventMeta;
}
