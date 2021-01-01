// Registration
export interface RegistrationRequest {
  authId?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
}

// GetCurrentUser
export interface GetCurrentUserRequest {
  authId?: string;
}

export interface User {
  id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
}

export interface GetCurrentUserResponse {
  user?: User;
}

// Events
export interface UserCreatedEvent {
  id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
}
