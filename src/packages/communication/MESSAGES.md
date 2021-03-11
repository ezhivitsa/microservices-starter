# Messages documentation

- [Authorization messages](#authorization-messages-Channel.Authorization)
  - [Registration command (v1)](#registration-command-v1)
  - [Cancel registration command (v1)](#cancel-registration-command-v1)
  - [Get access token command (v1)](#get-access-token-command-v1)
  - [Get refresh token command (v1)](#get-refresh-token-command-v1)
  - [Get user command (v1)](#get-user-command-v1)
  - [Save token command (v1)](#save-token-command-v1)
  - [Revoke token command (v1)](#revoke-token-command-v1)
  - [Verify scope command (v1)](#verify-scope-command-v1)
  - [Verify email command (v1)](#verify-email-command-v1)
  - [Get signup token command (v1)](#get-signup-token-command-v1)
  - [Get forgot password token command (v1)](#get-forgot-password-token-command-v1)
  - [Reset password command (v1)](#reset-password-command-v1)
- [Email messages](#email-messages-Channel.Email)
  - [Send verify email command (v1)](#send-verify-email-command-v1)
  - [Send forgot password email command (v1)](#send-forgot-password-email-command-v1)
- [Users messages (Channel.Users)](#users-messages-Channel.Users)
  - [Registration command (v1)](#registration-command-v1)
  - [Get user by auth id command (v1)](#get-user-by-auth-id-command-v1)
  - [Update user command (v1)](#update-user-command-v1)


## Authorization messages (Channel.Authorization)

### Registration command (v1)

- Command - *AuthorizationCommand.Registration*
- Request - *RegistrationRequest*
- Response - *RegistrationResponse*

### Cancel registration command (v1)

- Command - *AuthorizationCommand.CancelRegistration*
- Request - *RegistrationRequest*

### Get access token command (v1)

- Command - *AuthorizationCommand.GetAccessToken*
- Request - *GetAccessTokenRequest*
- Response - *GetAccessTokenResponse*

### Get refresh token command (v1)

- Command - *AuthorizationCommand.GetRefreshToken*
- Request - *GetRefreshTokenRequest*
- Response - *GetRefreshTokenResponse*

### Get user command (v1)

- Command - *AuthorizationCommand.GetUser*
- Request - *GetUserRequest*
- Response - *GetUserResponse*

### Save token command (v1)

- Command - *AuthorizationCommand.SaveToken*
- Request - *SaveTokenRequest*

### Revoke token command (v1)

- Command - *AuthorizationCommand.RevokeToken*
- Request - *RevokeTokenRequest*

### Verify scope command (v1)

- Command - *AuthorizationCommand.VerifyScope*
- Request - *VerifyScopeRequest*
- Response - *VerifyScopeResponse*

### Verify email command (v1)

- Command - *AuthorizationCommand.VerifyEmail*
- Request - *VerifyEmailRequest*

### Get signup token command (v1)

- Command - *AuthorizationCommand.GetSignupToken*
- Request - *GetSignupTokenRequest*
- Response - *GetSignupTokenResponse*

### Get forgot password token command (v1)

- Command - *AuthorizationCommand.GetForgotPasswordToken*
- Request - *GetForgotPasswordTokenRequest*
- Response - *GetForgotPasswordTokenResponse*

### Reset password command (v1)

- Command - *AuthorizationCommand.ResetPassword*
- Request - *ResetPasswordRequest*

## Email messages (Channel.Email)

### Send verify email command (v1)

- Command - *EmailCommand.SendVerifyEmail*
- Request - *SendVerifyEmailRequest*

### Send forgot password email command (v1)

- Command - *EmailCommand.SendForgotPasswordEmail*
- Request - *SendForgotPasswordEmailRequest*

## Users messages (Channel.Users)

### Registration command (v1)

- Command - *UserCommand.Registration*
- Request - *RegistrationRequest*

### Get user by auth id command (v1)

- Command - *UserCommand.GetUserByAuthId*
- Request - *GetUserByAuthIdRequest*
- Response - *GetUserByAuthIdResponse*

### Update user command (v1)

- Command - *UserCommand.UpdateUser*
- Request - *UpdateUserRequest*
- Response - *UpdateUserResponse*
