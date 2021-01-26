import * as AuthorizationTypes from '../types';
import { root } from './root';

export const registrationRequest = root.loadProtoMessage<AuthorizationTypes.RegistrationRequest>(
  'microservices_starter.authorization.auth.RegistrationRequest',
);

export const registrationResponse = root.loadProtoMessage<AuthorizationTypes.RegistrationResponse>(
  'microservices_starter.authorization.auth.RegistrationResponse',
);

export const getAccessTokenRequest = root.loadProtoMessage<AuthorizationTypes.GetAccessTokenRequest>(
  'microservices_starter.authorization.auth.GetAccessTokenRequest',
);

export const getAccessTokenResponse = root.loadProtoMessage<AuthorizationTypes.GetAccessTokenResponse>(
  'microservices_starter.authorization.auth.GetAccessTokenResponse',
);

export const getRefreshTokenRequest = root.loadProtoMessage<AuthorizationTypes.GetRefreshTokenRequest>(
  'microservices_starter.authorization.auth.GetRefreshTokenRequest',
);

export const getRefreshTokenResponse = root.loadProtoMessage<AuthorizationTypes.GetRefreshTokenResponse>(
  'microservices_starter.authorization.auth.GetRefreshTokenResponse',
);

export const getUserRequest = root.loadProtoMessage<AuthorizationTypes.GetUserRequest>(
  'microservices_starter.authorization.auth.GetUserRequest',
);

export const getUserResponse = root.loadProtoMessage<AuthorizationTypes.GetUserResponse>(
  'microservices_starter.authorization.auth.GetUserResponse',
);

export const saveTokenRequest = root.loadProtoMessage<AuthorizationTypes.SaveTokenRequest>(
  'microservices_starter.authorization.auth.SaveTokenRequest',
);

export const revokeTokenRequest = root.loadProtoMessage<AuthorizationTypes.RevokeTokenRequest>(
  'microservices_starter.authorization.auth.RevokeTokenRequest',
);

export const verifyScopeRequest = root.loadProtoMessage<AuthorizationTypes.VerifyScopeRequest>(
  'microservices_starter.authorization.auth.VerifyScopeRequest',
);

export const verifyScopeResponse = root.loadProtoMessage<AuthorizationTypes.VerifyScopeResponse>(
  'microservices_starter.authorization.auth.VerifyScopeResponse',
);

export const verifyEmailRequest = root.loadProtoMessage<AuthorizationTypes.VerifyEmailRequest>(
  'microservices_starter.authorization.auth.VerifyEmailRequest',
);

export const getSignupTokenRequest = root.loadProtoMessage<AuthorizationTypes.GetSignupTokenRequest>(
  'microservices_starter.authorization.auth.GetSignupTokenRequest',
);

export const getSignupTokenResponse = root.loadProtoMessage<AuthorizationTypes.GetSignupTokenResponse>(
  'microservices_starter.authorization.auth.GetSignupTokenResponse',
);
