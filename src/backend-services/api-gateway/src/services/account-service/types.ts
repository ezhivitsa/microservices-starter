import { AuthProviderTypes } from 'providers';

export interface RegisterParams {
  firstName?: string;
  lastName: string;
  email: string;
  password: string;
  owner: boolean;
}

export type GetAccessTokenParams = AuthProviderTypes.GetAccessTokenParams;
export type GetAccessTokenResult = AuthProviderTypes.AccessToken;

export type GetRefreshTokenParams = AuthProviderTypes.GetRefreshTokenParams;
export type GetRefreshTokenResult = AuthProviderTypes.RefreshToken;

export type GetUserParams = AuthProviderTypes.GetUserParams;
export type GetUserResult = AuthProviderTypes.User;

export type SaveTokenParams = AuthProviderTypes.SaveTokenParams;

export type RevokeTokenParams = AuthProviderTypes.RevokeTokenParams;

export type VerifyScopeParams = AuthProviderTypes.VerifyScopeParams;

export type User = AuthProviderTypes.User;

export type VerifyEmailParams = AuthProviderTypes.VerifyEmailParams;

export type ResendVerifyEmailParams = AuthProviderTypes.GetSignupTokenParams;

export type SendForgotPasswordEmailParams = AuthProviderTypes.SendForgotPasswordEmailParams;

export type ResetPasswordParams = AuthProviderTypes.ResetPasswordParams;
