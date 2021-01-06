interface User {
  firstName?: string;
  lastName: string;
  email: string;
}

export interface GetCurrentUserResponse {
  user: User | null;
}
