import { SessionUser } from '@packages/koa-kafka';

export interface RegisterParams {
  authId: string;
  email: string;
  firstName?: string;
  lastName: string;
}

export interface GetUserByAuthIdParams {
  authId: string;
}

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName: string;
}

export interface UpdateUserParams {
  id: string;
  firstName?: string;
  lastName: string;
}

export interface Metadata {
  user?: SessionUser;
}
