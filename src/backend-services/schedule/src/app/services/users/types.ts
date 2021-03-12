export interface CreateUserParams {
  id: string;
  firstName?: string;
  lastName: string;
  email: string;
}

export interface UpdateUserParams {
  id: string;
  firstName?: string;
  lastName: string;
  email: string;
}
