import { AuthPaths } from '@packages/common';

const tokenPlaceholder = ':token';

export const verifyEmailPathTemplate = AuthPaths.verifyEmailPath({ token: tokenPlaceholder });

export interface VerifyEmailParams {
  token: string;
}
