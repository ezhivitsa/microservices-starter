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

export type VerifyEmailRequest = Required<AuthorizationTypes.VerifyEmailRequest>;
export type GetSignupTokenRequest = Required<AuthorizationTypes.GetSignupTokenRequest>;

export type GetForgotPasswordTokenRequest = Required<AuthorizationTypes.GetForgotPasswordTokenRequest>;
export type GetForgotPasswordTokenResponse = Required<AuthorizationTypes.GetForgotPasswordTokenResponse>;

export type ResetPasswordRequest = Required<AuthorizationTypes.ResetPasswordRequest>;
