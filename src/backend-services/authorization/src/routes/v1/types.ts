import { AuthorizationTypes } from '@packages/communication';

export type GetAccessTokenRequest = Required<AuthorizationTypes.GetAccessTokenRequest>;
export type User = Required<AuthorizationTypes.User>;
export type GetRefreshTokenRequest = Required<AuthorizationTypes.GetRefreshTokenRequest>;
export type GetUserRequest = Required<AuthorizationTypes.GetUserRequest>;
export type RegistrationRequest = Required<AuthorizationTypes.RegistrationRequest>;
export interface RevokeTokenRequest extends Required<AuthorizationTypes.RevokeTokenRequest> {
  user: User;
}
export interface SaveTokenRequest extends Required<AuthorizationTypes.SaveTokenRequest> {
  user: User;
}
export interface VerifyScopeRequest extends Required<AuthorizationTypes.VerifyScopeRequest> {
  user: User;
}
